import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * IOS Safari는 크로스사이트 요청에 대해 쿠키를 매우 엄격하게 제한하므로
 * API Routes를 활용하여 로그인 쿠키를 설정
 * 브라우저 -> Next.js API Routes -> Nest.js -> Next.js API Routes -> 브라우저
 */
export async function POST(req: NextRequest) {
  try {
    /** 요청 body값 */
    const body = await req.json();

    /**
     * 로그인 API
     * 받은 POST 요청을 Nest.js 서버에 그대로 요청
     */
    const signinResponse = await fetch(
      `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/auth/signin`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      }
    );

    const signinData = await signinResponse.json();

    /** 토큰 */
    const tokenValue = signinData.data.token;

    if (!tokenValue) {
      throw new Error("로그인을 실패하였습니다. (쿠키값 없음)");
    }

    cookies().set({
      name: "token",
      value: tokenValue,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 2 * 60 * 60 * 1000, // 2시간 후 만료
    });

    return NextResponse.json(signinData);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      data: null,
      result: "failure",
      message: error.response?.data?.message || error.message,
    });
  }
}
