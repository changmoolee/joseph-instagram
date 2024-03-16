import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

/**
 * 쿠키 인증 미들웨어
 */
export default async function middleware(req: NextRequest) {
  // api/post 경로는 인증 검사 제외
  if (req.nextUrl.pathname === "/api/post") {
    return NextResponse.next();
  }

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
    const { iat, exp, ...userData } = decoded;

    /** 토큰에서 정보 추출 */
    const stringifiedUserData = Buffer.from(JSON.stringify(userData)).toString(
      "base64"
    );
    /** 응답객체 헤더에 정보를 할당하여 라우트 핸들러에서 사용할 수 있도록 함. */
    response.headers.set("userId", stringifiedUserData);

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { result: "fail", message: error.message },
      {
        status: 401,
      }
    );
  }
}

export const config = {
  /** 쿠키 인증이 필요한 api 경로 */
  matcher: [
    "/api/post/:path",
    "/api/user/:path",
    "/api/user/edit",
    "/api/user/my-page",
  ],
};
