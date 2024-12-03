import dayjs from "dayjs";
import { connectToDatabase } from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

/** 댓글 등록 */
export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { text } = await req.json();

  const { client } = await connectToDatabase();

  const db = client.db("sample_mflix");

  const postId = params.postId || "";
  try {
    const encodedUserData = req.headers.get("userId");

    if (encodedUserData) {
      const decodedUserData = Buffer.from(encodedUserData, "base64").toString(
        "utf8"
      );
      // 회원 유무 검색
      const userData = JSON.parse(decodedUserData);

      // 데이터 추가
      await db.collection("comments").insertOne({
        postId: new ObjectId(postId),
        text,
        replies: [],
        CreateUser: new ObjectId(userData._id),
        CreateDate: dayjs().format(),
      });

      return NextResponse.json({
        result: "success",
        message: "댓글 등록을 성공하였습니다.",
      });
    }
    throw new Error("로그인 관련 프로필 데이터가 존재하지 않습니다.");
  } catch (error: any) {
    return NextResponse.json({ result: "fail", message: error.message });
  }
}
