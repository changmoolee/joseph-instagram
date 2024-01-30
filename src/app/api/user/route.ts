import { connectToDatabase } from "../../../../utils/mongodb";

export async function GET(request: any) {
  const { client } = await connectToDatabase();

  const db = client.db("sample_mflix");

  try {
    // 데이터 추가
    const usersData = await db
      .collection("users")
      .find({})
      .skip(0)
      .limit(10)
      .toArray();

    return Response.json({
      data: usersData,
      result: "successs",
      message: "",
    });
  } catch (error: any) {
    return Response.json({ result: "fail", message: error.message });
  }
}
