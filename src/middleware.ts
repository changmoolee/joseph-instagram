import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

/**
 * 쿠키 인증 미들웨어
 */
export default async function middleware(req: NextRequest) {
  const JWT_SECRET = process.env.JWT_SECRET as string;

  /** 토큰 추출 */
  const token = req.cookies.get("token")?.value;

  const response = NextResponse.next();

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
        "프로필 데이터가 존재하지 않습니다. 관리자에게 문의하세요."
      );
    }

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { result: "failure", message: error.message },
      {
        status: 401,
      }
    );
  }
}

export const config = {
  matcher: [],
};
