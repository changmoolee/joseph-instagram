import bcrypt from "bcrypt";
import { connectToDatabase } from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as jose from "jose";

export async function POST(req: NextRequest) {
  const { client } = await connectToDatabase();

  const db = client.db("sample_mflix");

  const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

  const { email, password } = await req.json();

  try {
    const getResult = await db.collection("users").findOne({ email });

    // 이메일 검증
    if (!getResult?.email) {
      throw new Error("아이디가 존재하지 않습니다.");
    }

    /** 패스워드 일치 여부 */
    const isMatch = await bcrypt.compare(password, getResult?.password);

    // 패스워드 검증
    if (!isMatch) {
      throw new Error("비밀번호가 올바르지 않습니다.");
    }

    /** 비밀번호를 제외한 유저의 프로필 데이터를 분리한다. */
    const { password: resultPassword, ...rest } = getResult;

    /** 유저 개인 프로필 데이터 */
    const userProfileData = rest;

    /** 토큰 */
    const token = await new jose.SignJWT(userProfileData)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(new TextEncoder().encode(JWT_SECRET));

    // https://nextjs.org/docs/app/api-reference/functions/cookies
    cookies().set("token", token);

    return NextResponse.json({
      message: "로그인을 성공하였습니다.",
      result: "success",
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, result: "fail" });
  }
}
