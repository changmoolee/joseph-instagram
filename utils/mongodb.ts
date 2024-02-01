import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB as string;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  if (!dbName) {
    throw new Error("Please define the MONGODB_DB environment variable");
  }

  const client = new MongoClient(uri);

  await client.connect();
  const db = client.db(dbName);

  console.log("Pinged your deployment. You successfully connected to MongoDB!");

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
