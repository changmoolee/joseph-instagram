import { connectToDatabase } from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { IFollowData, IUserData } from "@/typescript/user.interface";

/** 회원 데이터 조회 */
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { client } = await connectToDatabase();

  const db = client.db("sample_mflix");

  const userId = params.userId || "";

  /** 해당 회원의 회원 데이터 */
  const userData = await db
    .collection<IUserData>("users")
    .findOne<IUserData>({ _id: new ObjectId(userId) });

  /** 해당 회원의 팔로우/팔로잉 데이터 */
  const followData = await db
    .collection<IFollowData>("follows")
    .find<IFollowData>({
      $or: [
        { followerId: new ObjectId(userId) },
        { followingId: new ObjectId(userId) },
      ],
    })
    .toArray();

  /** 팔로워 수 */
  const followersNumber = followData.filter(
    (data: IFollowData) => data.followerId.toString() === userId
  ).length;

  /** 팔로잉 수 */
  const followingNumber = followData.filter(
    (data: IFollowData) => data.followingId.toString() === userId
  ).length;

  /** 정제 데이터 */
  const refinedData = {
    ...userData,
    followers: followersNumber,
    following: followingNumber,
  };

  try {
    return NextResponse.json({
      data: refinedData,
      result: "success",
    });
  } catch (error: any) {
    return NextResponse.json({
      result: "fail",
      message: error.message,
    });
  }
}
