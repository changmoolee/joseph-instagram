import dayjs from "dayjs";
import { connectToDatabase } from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

/** 좋아요 실행 */
export async function POST(req: NextRequest) {
  const { likeId, postId, createUser } = await req.json();

  const { client } = await connectToDatabase();

  const db = client.db("sample_mflix");

  try {
    /** 좋아요 likes 데이터 (이전 데이터 유무) */
    const likesData = await db.collection("likes").findOne({
      postId: new ObjectId(postId),
      userId: new ObjectId(createUser),
    });

    /** 게시물 posts 데이터 (좋아요 요청이 온 게시물) */
    const postData = await db.collection("posts").findOne({
      _id: new ObjectId(postId),
      CreateUser: new ObjectId(createUser),
    });

    // 게시물 posts 검증
    if (postData?._idl) {
      throw new Error("좋아요를 실행할 게시물이 존재하지 않습니다.");
    }

    // 좋아요 likes 데이터 유무에 따라
    if (likesData?._id) {
      // 좋아요 해제 - 좋아요 데이터 삭제
      await db
        .collection("likes")
        .deleteOne({ _id: new ObjectId(likesData._id) });
    } else {
      // 좋아요 생성 - 좋아요 데이터 추가
      await db.collection("likes").insertOne({
        postId: new ObjectId(postId),
        userId: new ObjectId(createUser),
        createdAt: dayjs().format(),
      });
    }

    return NextResponse.json({
      result: "success",
      message: `좋아요를 수정하였습니다.`,
    });
  } catch (error: any) {
    return NextResponse.json({ result: "fail", message: error.message });
  }
}
