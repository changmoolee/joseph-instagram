import { connectToDatabase } from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { client } = await connectToDatabase();

  const db = client.db("sample_mflix");

  const url = req.nextUrl;

  const searchWord = url.searchParams.get("searchWord") || "";

  // Create a query that searches for the string "trek"
  const regexQuery = {
    $or: [
      { name: { $regex: searchWord, $options: "i" } },
      { email: { $regex: searchWord, $options: "i" } },
    ],
  };

  try {
    // 데이터 추가
    const usersData = await db
      .collection("users")
      .find(regexQuery)
      .limit(10)
      .toArray();

    return NextResponse.json({
      data: usersData || [],
      result: "success",
      message: "",
    });
  } catch (error: any) {
    return NextResponse.json({ result: "fail", message: error.message });
  }
}
