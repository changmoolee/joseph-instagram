import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!process.env.MAIL_AUTH_CODE_API_KEY) {
      throw new Error(
        "환경변수 MAIL_AUTH_CODE_API_KEY가 설정되어 있지 않습니다."
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/auth-code/send`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          /** 외부 발송을 막기 위한 비공개 키 */
          "x-app-secret": process.env.MAIL_AUTH_CODE_API_KEY,
        },
        body: JSON.stringify({ email }),
      }
    );

    return response;
  } catch (error: any) {
    throw error;
  }
}
