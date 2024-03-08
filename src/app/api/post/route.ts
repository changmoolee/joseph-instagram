import dayjs from "dayjs";
import { connectToDatabase } from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const textBody = await new Response(req.body).text();

  const parsedBody = JSON.parse(textBody);

  const { CreateUser, image, description } = parsedBody;

  const { client } = await connectToDatabase();

  const db = client.db("sample_mflix");

  try {
    // 데이터 추가
    await db.collection("posts").insertOne({
      CreateUser,
      CreateDate: dayjs().format(),
      image,
      description,
    });

    return NextResponse.json({
      result: "success",
      message: "게시물 등록을 성공하였습니다.",
    });
  } catch (error: any) {
    return NextResponse.json({ result: "fail", message: error.message });
  }
}
