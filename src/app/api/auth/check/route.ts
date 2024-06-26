import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function GET(req: NextRequest) {
  const JWT_SECRET = process.env.JWT_SECRET as string;

  /** 토큰 추출 */
  const token = req.cookies.get("token")?.value;

  try {
    if (!token) {
      throw new Error("로그인이 되어있지 않습니다.");
    }

    /** 토큰 검증 */
    const { payload: decoded } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );

    if (typeof decoded === "string") {
      throw new Error(
        "프로필 데이터가 존재하지 않습니다. 비로그인 처리합니다."
      );
    }

    return NextResponse.json({ result: "success", message: "" });
  } catch (error: any) {
    return NextResponse.json({ result: "fail", message: error.message });
  }
}
