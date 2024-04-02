import dayjs from "dayjs";
import { connectToDatabase } from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

/** 게시물 조회 */
export async function GET(req: NextRequest) {
  const { client } = await connectToDatabase();

  const db = client.db("sample_mflix");

  /** 한 번에 가져올 데이터 개수 */
  // const pageSize = 10;

  // 데이터 추가
  const postsData = await db
    .collection("posts")
    .aggregate([
      {
        $lookup: {
          from: "users",
          localField: "CreateUser",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "postId",
          as: "likeDetails",
        },
      },
      { $sort: { createdAt: -1 } },
      { $limit: 10 },
    ])
    // .skip(currentSkip)
    // .limit(pageSize)
    .toArray();

  try {
    return NextResponse.json({
      data: postsData,
      result: "success",
    });
  } catch (error: any) {
    return NextResponse.json({
      result: "fail",
      message: error.message,
    });
  }
}

/** 게시물 등록 */
export async function POST(req: NextRequest) {
  const { image, description } = await req.json();

  const { client } = await connectToDatabase();

  const db = client.db("sample_mflix");

  try {
    const encodedUserData = req.headers.get("userId");

    if (encodedUserData) {
      const decodedUserData = Buffer.from(encodedUserData, "base64").toString(
        "utf8"
      );
      const userData = JSON.parse(decodedUserData);

      // 데이터 추가
      await db.collection("posts").insertOne({
        CreateUser: new ObjectId(userData._id),
        CreateDate: dayjs().format(),
        image,
        description,
      });

      return NextResponse.json({
        result: "success",
        message: "게시물 등록을 성공하였습니다.",
      });
    }
  } catch (error: any) {
    return NextResponse.json({ result: "fail", message: error.message });
  }
}
