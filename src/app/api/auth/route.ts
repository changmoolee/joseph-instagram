import { connectToDatabase } from "../../../../utils/mongodb";

export async function POST(request: any) {
  const { client } = await connectToDatabase();

  const db = client.db("sample_mflix");

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

    return Response.json("로그인을 성공하였습니다.");
  } catch (error: any) {
    return Response.json(error.message);
  } finally {
    await client.close();
  }
}
