import dayjs from "dayjs";
import { connectToDatabase } from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

/** 북마크 실행 */
export async function POST(req: NextRequest) {
  const { postId, createUser } = await req.json();

  const { client } = await connectToDatabase();

  const db = client.db("sample_mflix");

  try {
    /** 북마크 데이터 (이전 데이터 유무) */
    const bookmarksData = await db.collection("bookmarks").findOne({
      postId: new ObjectId(postId),
      userId: new ObjectId(createUser),
    });

    /** 게시물 posts 데이터 (북마크 요청이 온 게시물) */
    const postData = await db.collection("posts").findOne({
      _id: new ObjectId(postId),
    });

    // 게시물 posts 검증
    if (!postData?._id) {
      throw new Error("북마크 저장/해제를 실행할 게시물이 존재하지 않습니다.");
    }

    // 좋아요 likes 데이터 유무에 따라
    if (bookmarksData?._id) {
      // 좋아요 해제 - 좋아요 데이터 삭제
      await db
        .collection("bookmarks")
        .deleteOne({ _id: new ObjectId(bookmarksData._id) });
    } else {
      // 좋아요 생성 - 좋아요 데이터 추가
      await db.collection("bookmarks").insertOne({
        postId: new ObjectId(postId),
        userId: new ObjectId(createUser),
        createdAt: dayjs().format(),
      });
    }

    return NextResponse.json({
      result: "success",
      message: `북마크 저장/해제를 실행하였습니다.`,
    });
  } catch (error: any) {
    return NextResponse.json({ result: "fail", message: error.message });
  }
}
