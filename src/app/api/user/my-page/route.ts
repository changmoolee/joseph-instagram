import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongodb";

export async function GET(req: NextRequest) {
  try {
    const encodedUserData = req.headers.get("userId");

    if (encodedUserData) {
      const decodedUserData = Buffer.from(encodedUserData, "base64").toString(
        "utf8"
      );
      const userData = JSON.parse(decodedUserData);

      return NextResponse.json({
        data: userData,
        result: "success",
        message: "",
      });
    } else {
      throw new Error(
        "토큰 관련 에러가 발생했습니다. 관리자에게 문의해주세요."
      );
    }
  } catch (error: any) {
    return NextResponse.json({ result: "fail", message: error.message });
  }
}

export async function DELETE(req: NextRequest) {
  const { client } = await connectToDatabase();

  const db = client.db("sample_mflix");

  try {
    const encodedUserData = req.headers.get("userId");

    if (encodedUserData) {
      const decodedUserData = Buffer.from(encodedUserData, "base64").toString(
        "utf8"
      );
      const userData = JSON.parse(decodedUserData);

      const deleteResult = await db
        .collection("users")
        .deleteOne({ _id: userData._id });

      return NextResponse.json({
        result: "success",
        message: `${userData.name}님의 회원탈퇴가 완료되었습니다.`,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ result: "fail", message: error.message });
  }
}
