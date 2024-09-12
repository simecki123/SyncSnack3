import { getClientMongo } from "@/commons/db-connect";

export async function GET(request: Request) {
  const db = await getClientMongo();
  const collection = db.collection("rolesClc");
  // const data = await collection.find({}).toArray();
  const data = await collection.insertOne({ Mate: "String" });
  return new Response(JSON.stringify(data));
}
