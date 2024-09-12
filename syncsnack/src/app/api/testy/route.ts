import { getDB } from "@/commons/db-connect";

export async function GET(request: Request) {
  const db = await getDB();
  const collection = db.collection("documents");
  const data = await collection.find({}).toArray();
  return new Response(JSON.stringify(data));
}
