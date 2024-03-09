import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongodb";

export async function PATCH(req: NextRequest) {
  const { client } = await connectToDatabase();

  const db = client.db("sample_mflix");

  try {
    const { image, email, name, password } = await req.json();

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

    return NextResponse.json({
      result: "success",
      message: `${getResult.name}님의 정보 수정이 완료되었습니다.`,
    });
  } catch (error: any) {
    return NextResponse.json({ result: "fail", message: error.message });
  }
}

export async function POST(req: NextRequest) {
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

    return NextResponse.json("ok");
  } finally {
    await client.close();
  }
}
