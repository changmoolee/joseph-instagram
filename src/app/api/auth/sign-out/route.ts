import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    cookies().delete("token");

    return NextResponse.json({
      result: "success",
      message: "로그아웃을 성공하였습니다.",
    });
  } catch (error: any) {
    return NextResponse.json({ result: "fail", message: error.message });
  } finally {
  }
}
