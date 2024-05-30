import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

/** 회원의 게시물 데이터 조회 */
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { client } = await connectToDatabase();

  const db = client.db("sample_mflix");

  /** userId params */
  const userId = params.userId || "";

  const searchParams = req.nextUrl.searchParams;

  /** post query */
  const postQuery = searchParams.get("post");

  try {
    /** 회원 컬렉션 */
    const users = db.collection("users");
    /** 게시물 컬렉션 */
    const posts = await db
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
        {
          $lookup: {
            from: "bookmarks",
            localField: "_id",
            foreignField: "postId",
            as: "bookmarkDetails",
          },
        },
        {
          $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "postId",
            as: "commentDetails",
          },
        },
      ])
      .toArray();

    /** 좋아요 컬렉션 */
    const likes = db.collection("likes");
    /** 북마크 컬렉션 */
    const bookmarks = db.collection("bookmarks");

    /** 조회한 회원 도큐먼트 */
    const user = await users.findOne({ _id: new ObjectId(userId) });

    // 회원 유무 검증
    if (!user) {
      throw new Error("회원이 존재하지 않습니다.");
    }

    /** 해당 회원이 작성한 총 게시물 데이터 */
    const userPosts = posts.filter(
      (post) => post.CreateUser.toString() === userId
    );

    // post query 값이 'SAVED' 라면
    if (postQuery === "SAVED") {
      /** 해당 회원이 북마크를 누른 bookmark 도큐먼트 */
      const bookmarksPostData = await bookmarks
        .find({
          userId: new ObjectId(userId),
        })
        .toArray();

      /** 해당 회원이 북마크를 누른 postId 목록 */
      const bookmarksPostId = bookmarksPostData.map((bookmark) =>
        bookmark.postId.toString()
      );

      /** 해당 회원이 북마크를 저장한 게시물 */
      const bookmarkPosts = posts.filter((post) =>
        bookmarksPostId.includes(post._id.toString())
      );

      return NextResponse.json({
        data: bookmarkPosts,
        result: "success",
        message: "",
      });
    }

    // post query 값이 'LIKED' 라면
    if (postQuery === "LIKED") {
      /** 해당 회원이 좋아요를 누른 like 도큐먼트 */
      const likesPostData = await likes
        .find({ userId: new ObjectId(userId) })
        .toArray();

      /** 해당 회원이 좋아요를 누른 postId 목록 */
      const likesPostId = likesPostData.map((like) => like.postId.toString());

      /** 해당 회원이 좋아요를 누른 게시물 */

      const likePosts = posts.filter((post) =>
        likesPostId.includes(post._id.toString())
      );

      return NextResponse.json({
        data: likePosts,
        result: "success",
        message: "",
      });
    }

    // 이외의 경우는 해당 회원이 작성한 게시물을 보여준다.
    return NextResponse.json({
      data: userPosts,
      result: "success",
      message: "",
    });
  } catch (error: any) {
    return NextResponse.json({ result: "fail", message: error.message });
  }
}
