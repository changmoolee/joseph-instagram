import { ObjectId, Document } from "mongodb";
import { connectToDatabase } from "../../../../../utils/mongodb";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { client } = await connectToDatabase();

  const db = client.db("sample_mflix");

  const url = req.nextUrl;

  const userId = url.searchParams.get("userId") || "";

  try {
    const users = db.collection("users");

    const posts = db.collection("posts");

    const user = await users.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      throw new Error("회원이 존재하지 않습니다.");
    }

    const userPosts = await posts
      .find({ userId: user._id.toString() })
      .toArray();

    return Response.json({
      data: userPosts,
      result: "success",
      message: "",
    });
  } catch (error: any) {
    return Response.json({ result: "fail", message: error.message });
  }
}
