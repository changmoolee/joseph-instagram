import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongodb";
import { ObjectId } from "mongodb";

export async function PATCH(req: NextRequest) {
  const { client } = await connectToDatabase();

  const db = client.db("sample_mflix");

  try {
    const encodedUserData = req.headers.get("userId");

    if (encodedUserData) {
      const decodedUserData = Buffer.from(encodedUserData, "base64").toString(
        "utf8"
      );
      const userData = JSON.parse(decodedUserData);

      const { image, email, name, password } = await req.json();

      const getResult = await db.collection("users").findOne({ email });

      // 이메일 검증
      if (!getResult?.email) {
        throw new Error("아이디(이메일)가 존재하지 않습니다.");
      }

      // cost 10
      const saltRounds = 10;

      /** 해싱처리한 패스워드 */
      const hashedPassword =
        password ?? (await bcrypt.hash(password, saltRounds));

      const updateResult = await db.collection("users").updateOne(
        { _id: new ObjectId(userData._id) },
        {
          $set: {
            name,
            ...(image && { image }),
            ...(hashedPassword && { password: hashedPassword }),
          },
        }
      );

      return NextResponse.json({
        result: "success",
        message: `${userData.name}님의 정보 수정이 완료되었습니다.`,
      });
    }
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
