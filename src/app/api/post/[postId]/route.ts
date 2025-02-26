import dayjs from "dayjs";
import { connectToDatabase } from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import {
  ICommentData,
  ILikeData,
  IPostData,
} from "@/typescript/post.interface";
import { IUserData } from "@/typescript/user.interface";

/** 게시물 댓글 조회 */
export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { client } = await connectToDatabase();

  const db = client.db("sample_mflix");

  const postId = params.postId || "";

  // 데이터 추가
  // const postsData = await db
  //   .collection<IPostData>("posts")
  //   .findOne<IPostData>({ _id: new ObjectId(postId) });

  // 데이터 추가
  // const likesData = await db
  //   .collection<ILikeData>("likes")
  //   .find<ILikeData>({ postId: new ObjectId(postId) })
  //   .toArray();

  // 데이터 추가
  const commentsData = await db
    .collection<ICommentData>("comments")
    .find<ICommentData>({ postId: new ObjectId(postId) })
    .toArray();

  const userIds = [
    // ...(postsData?.CreateUser ? [postsData.CreateUser] : []),
    // ...likesData.map((like: ILikeData) => like.userId),
    ...commentsData.map((comment: ICommentData) => comment.CreateUser),
  ];

  // 데이터 추가
  const usersData = await db
    .collection<IUserData>("users")
    .find<IUserData>({ _id: { $in: userIds } })
    .toArray();

  // const refinedData = {
  // ...postsData,
  // CreateUserName: usersData
  //   .filter(
  //     (user) => user._id.toString() === postsData?.CreateUser.toString()
  //   )
  //   .at(0)?.name,
  // CreateUserImage: usersData
  //   .filter(
  //     (user) => user._id.toString() === postsData?.CreateUser.toString()
  //   )
  //   .at(0)?.image,
  // likeDetails: likesData,
  // commentDetails: commentsData?.map((commentData) => ({
  //   ...commentData,
  //   username: usersData
  //     .filter(
  //       (user) => user._id.toString() === commentData.CreateUser.toString()
  //     )
  //     .at(0)?.name,
  // })),
  // };

  const commentDetails = commentsData?.map((commentData) => ({
    ...commentData,
    userImage: usersData
      .filter(
        (user) => user._id.toString() === commentData.CreateUser.toString()
      )
      .at(0)?.image,
    username: usersData
      .filter(
        (user) => user._id.toString() === commentData.CreateUser.toString()
      )
      .at(0)?.name,
  }));

  try {
    return NextResponse.json({
      data: commentDetails,
      result: "success",
    });
  } catch (error: any) {
    return NextResponse.json({
      result: "failure",
      message: error.message,
    });
  }
}
