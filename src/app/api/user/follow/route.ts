import dayjs from "dayjs";
import { connectToDatabase } from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

/** 팔로우 실행 */
export async function POST(req: NextRequest) {
  const { followerId, followingId } = await req.json();

  const { client } = await connectToDatabase();

  const db = client.db("sample_mflix");

  try {
    const encodedUserData = req.headers.get("userId");

    if (encodedUserData) {
      const decodedUserData = Buffer.from(encodedUserData, "base64").toString(
        "utf8"
      );
      // 회원 유무 검색
      const userData = JSON.parse(decodedUserData);

      /** 팔로우 follows 데이터 (이전 데이터 유무) */
      const followData = await db.collection("follows").findOne({
        followerId: new ObjectId(followerId),
        followingId: new ObjectId(userData._id),
      });

      // 팔로우 follows 데이터 유무에 따라
      if (followData?._id) {
        // 팔로우 해제 - 팔로우 데이터 삭제
        await db
          .collection("follows")
          .deleteOne({ _id: new ObjectId(followData._id) });
      } else {
        // 팔로우 등록 - 팔로우 데이터 추가
        await db.collection("follows").insertOne({
          followerId: new ObjectId(followerId),
          followingId: new ObjectId(userData._id),
          CreatedAt: dayjs().format(),
        });
      }

      return NextResponse.json({
        result: "success",
        message: `팔로우를 등록/해제하였습니다.`,
      });
    }
    throw new Error("로그인 관련 프로필 데이터가 존재하지 않습니다.");
  } catch (error: any) {
    return NextResponse.json({ result: "fail", message: error.message });
  }
}
