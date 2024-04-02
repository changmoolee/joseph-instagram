import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { client } = await connectToDatabase();

  const db = client.db("sample_mflix");

  const userId = params.userId || "";

  const searchParams = req.nextUrl.searchParams;

  const postQuery = searchParams.get("post");

  try {
    const users = db.collection("users");

    const posts = db.collection("posts");

    const user = await users.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      throw new Error("회원이 존재하지 않습니다.");
    }

    const postIdsArray = user.post[`${postQuery}`];

    const transformedArray = postIdsArray.map((id: string) => new ObjectId(id));

    const userPosts = await posts
      .find({ _id: { $in: transformedArray } })
      .toArray();

    return NextResponse.json({
      data: userPosts,
      result: "success",
      message: "",
    });
  } catch (error: any) {
    return NextResponse.json({ result: "fail", message: error.message });
  }
}
