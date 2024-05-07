import { connectToDatabase } from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { IUserData } from "@/typescript/user.interface";

/** 회원 데이터 조회 */
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { client } = await connectToDatabase();

  const db = client.db("sample_mflix");

  const userId = params.userId || "";

  // 데이터 추가
  const userData = await db
    .collection<IUserData>("users")
    .findOne<IUserData>({ _id: new ObjectId(userId) });

  try {
    return NextResponse.json({
      data: userData,
      result: "success",
    });
  } catch (error: any) {
    return NextResponse.json({
      result: "fail",
      message: error.message,
    });
  }
}
