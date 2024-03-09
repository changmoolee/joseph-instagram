import dayjs from "dayjs";
import { connectToDatabase } from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const { image, description } = await req.json();

  const { client } = await connectToDatabase();

  const db = client.db("sample_mflix");

  const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

  const token = req.cookies.get("token")?.value;

  try {
    if (!token) {
      throw new Error("로그인이 되어있지 않습니다.");
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string") {
      throw new Error(
        "프로필 데이터가 존재하지 않습니다. 관리자에게 문의하세요."
      );
    }

    // 데이터 추가
    await db.collection("posts").insertOne({
      CreateUser: decoded._id,
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
