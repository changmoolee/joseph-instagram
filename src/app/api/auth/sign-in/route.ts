import jwt from "jsonwebtoken";
import { connectToDatabase } from "../../../../../utils/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const { client } = await connectToDatabase();

  const db = client.db("sample_mflix");

  const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

  const textBody = await new Response(request.body).text();

  const parsedBody = JSON.parse(textBody);

  const { email, password } = parsedBody;

  try {
    const getResult = await db.collection("users").findOne({ email });

    if (!getResult?.email) {
      throw new Error("아이디가 존재하지 않습니다.");
    }

    if (getResult?.password !== password) {
      throw new Error("비밀번호가 올바르지 않습니다.");
    }

    const token = jwt.sign(
      { userId: getResult._id }, // Payload (e.g., user ID)
      JWT_SECRET, // Secret key (store this in your environment variables)
      { expiresIn: "1h" } // Token expiration time
    );

    const response = NextResponse.next();

    response.cookies.set("token", token);

    return NextResponse.json({
      message: "로그인을 성공하였습니다.",
      result: "success",
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, result: "fail" });
  } finally {
    await client.close();
  }
}
