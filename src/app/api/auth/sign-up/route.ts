import bcrypt from "bcrypt";
import { connectToDatabase } from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const textBody = await new Response(req.body).text();

  const parsedBody = JSON.parse(textBody);

  const { image, email, name, password } = parsedBody;

  const { client } = await connectToDatabase();

  // cost 10
  const saltRounds = 10;

  /** 해싱처리한 패스워드 */
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const db = client.db("sample_mflix");

  try {
    // 데이터 추가
    await db.collection("users").insertOne({
      image,
      email,
      name,
      password: hashedPassword,
    });

    return NextResponse.json({
      result: "success",
      message: "회원가입을 성공하였습니다.",
    });
  } catch (error: any) {
    return NextResponse.json({ result: "fail", message: error.message });
  }
}
