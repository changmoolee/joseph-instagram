import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { connectToDatabase } from "@/utils/mongodb";

export async function PATCH(req: NextRequest) {
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

    const textBody = await new Response(req.body).text();

    const parsedBody = JSON.parse(textBody);

    const { image, email, name, password } = parsedBody;

    const getResult = await db.collection("users").findOne({ email });

    // cost 10
    const saltRounds = 10;

    /** 해싱처리한 패스워드 */
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 이메일 검증
    if (!getResult?.email) {
      throw new Error("아이디가 존재하지 않습니다.");
    }

    const updateResult = await db.collection("users").updateOne(
      { _id: getResult._id },
      {
        $set: {
          image,
          email,
          name,
          password: hashedPassword,
        },
      }
    );

    return Response.json({
      result: "success",
      message: `${getResult.name}님의 정보 수정이 완료되었습니다.`,
    });
  } catch (error: any) {
    return Response.json({ result: "fail", message: error.message });
  }
}

export async function POST(request: Request) {
  const { client } = await connectToDatabase();

  const db = client.db("sample_mflix");

  try {
    const insertResult = await db.collection("posts").insertOne({
      create_user: null,
      create_date: null,
      image: null,
      like_user: [],
      description: "",
    });

    console.log(
      `A document was inserted with the _id: ${insertResult.insertedId}`
    );

    return Response.json("ok");
  } finally {
    await client.close();
  }
}
