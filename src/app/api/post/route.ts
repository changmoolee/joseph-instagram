import dayjs from "dayjs";
import { connectToDatabase } from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

/** 게시물 조회 */
export async function GET(req: NextRequest) {
  const { client } = await connectToDatabase();

  const db = client.db("sample_mflix");

  /** 한 번에 가져올 데이터 개수 */
  // const pageSize = 10;

  // 데이터 추가
  const postsData = await db
    .collection("posts")
    .find()
    .sort({
      CreateDate: -1, // 내림차순(최신)
    })
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
        CreateUser: userData._id,
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
