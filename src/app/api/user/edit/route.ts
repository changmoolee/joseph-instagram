import { connectToDatabase } from "../../../../../utils/mongodb";

export async function PATCH(request: Request) {
  const { client } = await connectToDatabase();

  const db = client.db("sample_mflix");

  try {
    const updateResult = await db.collection("users").updateMany(
      {}, // This empty object means "match all documents"
      { $set: { id: null, posts: [], last_login_date: null } } // Replace 'newProperty' and 'defaultValue' as needed
    );

    console.log(
      `${updateResult.matchedCount} document(s) matched the filter, updated ${updateResult.modifiedCount} document(s)`
    );

    return Response.json("ok");
  } finally {
    await client.close();
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

export async function DELETE(request: Request) {
  const { client } = await connectToDatabase();

  const db = client.db("sample_mflix");

  try {
    const deleteResult = await db.collection("users").updateMany(
      {}, // Filter - empty for all documents
      { $unset: { id: "" } } // Replace 'propertyName' with the name of the property to remove
    );

    console.log(
      `${deleteResult.matchedCount} document(s) matched the filter, updated ${deleteResult.modifiedCount} document(s)`
    );
    return Response.json("ok");
  } finally {
    await client.close();
  }
}
