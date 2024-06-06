import dayjs from "dayjs";
import { connectToDatabase } from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { IFollowData, IUserData } from "@/typescript/user.interface";
import { IPostData } from "@/typescript/post.interface";

/** 팔로우 관련 회원 데이터 조회 */
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { client } = await connectToDatabase();

  const db = client.db("sample_mflix");

  const userId = params.userId;

  /**
   * 회원의 팔로우 데이터
   */
  const followerData = await db
    .collection<IFollowData>("follows")
    .find<IFollowData>({ followerId: new ObjectId(userId) })
    .project<Pick<IFollowData, "followingId">>({ followingId: 1, _id: 0 })
    .toArray();

  /**
   * 회원을 팔로우하고 있는 유저의 userId
   */
  const followerUserId = followerData.map((filtered) =>
    filtered.followingId.toString()
  );

  /**
   * 회원의 팔로우 데이터
   */
  const followingData = await db
    .collection<IFollowData>("follows")
    .find<IFollowData>({ followingId: new ObjectId(userId) })
    .project<Pick<IFollowData, "followerId">>({ followerId: 1, _id: 0 })
    .toArray();

  /**
   * 회원이 팔로우 하고 있는 유저의 userId
   */
  const followingUserId = followingData.map((filtered) =>
    filtered.followerId.toString()
  );

  /**
   * 조회가 필요한 userId 데이터들의 중복되는 데이터를 제거한다. (문자열로 타입 변경 후 중복 제거)
   */
  const SetUserIds = new Set([...followerUserId, ...followingUserId]);

  /**
   * 조회가 필요한 userId 데이터 (문자열로 변환된 것을 다시 ObjectId 로 원복)
   */
  const uniqueUserIds = Array.from(SetUserIds).map(
    (userId) => new ObjectId(userId)
  );

  /** 팔로워/팔로잉 유저 데이터 */
  const findUserData = await db
    .collection<IUserData>("users")
    .find<IUserData>({ _id: { $in: uniqueUserIds } })
    .toArray();

  const unifiedData = [];

  /** 해당 회원의 게시물 데이터 */
  for (let userData of findUserData) {
    /**
     * 유저 아이디
     */
    const userId = userData._id;

    /**
     * 해당 유저의 게시물 데이터
     */
    const postData = await db
      .collection<IPostData>("posts")
      .find<IPostData>({ CreateUser: userId })
      .toArray();

    /** 작성한 게시물 수 */
    const postsNumber = postData.length;

    /** 해당 회원의 팔로우/팔로잉 데이터 */
    const followNumberData = await db
      .collection<IFollowData>("follows")
      .find<IFollowData>({
        $or: [{ followerId: userId }, { followingId: userId }],
      })
      .project<Pick<IFollowData, "followerId" | "followingId">>({
        followerId: 1,
        followingId: 1,
        _id: 0,
      })
      .toArray();

    /** 팔로워 수 */
    const followersNumber = followNumberData.filter(
      (data) => data.followerId.toString() === userId.toString()
    ).length;

    /** 팔로잉 수 */
    const followingNumber = followNumberData.filter(
      (data) => data.followingId.toString() === userId.toString()
    ).length;

    /** 정제 데이터 */
    const refinedData = {
      ...userData,
      totalPostCount: postsNumber,
      followers: followersNumber,
      following: followingNumber,
    };

    // 반환할 배열에 데이터 추가
    unifiedData.push(refinedData);
  }

  /** 해당 회원의 팔로워 회원 데이터 */
  const followerUnifiedData = unifiedData.filter((data) =>
    followerUserId.includes(data._id.toString())
  );

  /** 해당 회원의 팔로워 회원 데이터 */
  const followingUnifiedData = unifiedData.filter((data) =>
    followingUserId.includes(data._id.toString())
  );

  try {
    return NextResponse.json({
      data: {
        follower: followerUnifiedData,
        following: followingUnifiedData,
      },
      result: "success",
    });
  } catch (error: any) {
    return NextResponse.json({
      result: "fail",
      message: error.message,
    });
  }
}
