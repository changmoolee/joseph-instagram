import { cookies } from "next/headers";

export async function POST(request: any) {
  try {
    cookies().delete("token");

    return Response.json({
      result: "success",
      message: "로그아웃을 성공하였습니다.",
    });
  } catch (error: any) {
    return Response.json({ result: "fail", message: error.message });
  } finally {
  }
}
