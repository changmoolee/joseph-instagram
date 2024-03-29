import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { connectToDatabase } from "../../../../../utils/mongodb";

export async function GET(req: NextRequest) {
  const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

  const token = req.cookies.get("token")?.value;

  try {
    if (!token) {
      throw new Error("로그인이 되어있지 않습니다.");
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string") {
      throw new Error(
        "프로필 데이터가 존재하지 않습니다. 관리자에게 문의하세요."
      );
    }

    const { iat, exp, ...userProfileData } = decoded;

    return Response.json({
      data: userProfileData,
      result: "successs",
      message: "",
    });
  } catch (error: any) {
    return Response.json({ result: "fail", message: error.message });
  }
}

export async function DELETE(req: NextRequest) {
  const { client } = await connectToDatabase();

  const db = client.db("sample_mflix");

  const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

  const token = req.cookies.get("token")?.value;

  try {
    if (!token) {
      throw new Error("로그인이 되어있지 않습니다.");
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string") {
      throw new Error(
        "프로필 데이터가 존재하지 않습니다. 관리자에게 문의하세요."
      );
    }

    const deleteResult = await db
      .collection("users")
      .deleteOne({ _id: decoded._id });

    return Response.json({
      result: "success",
      message: `${decoded.name}님의 회원탈퇴가 완료되었습니다.`,
    });
  } catch (error: any) {
    return Response.json({ result: "fail", message: error.message });
  }
}
