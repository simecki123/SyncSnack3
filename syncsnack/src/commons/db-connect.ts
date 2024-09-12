export async function getDB() {
  const url = `${process.env.MONGODB}`;
  const { MongoClient } = require("mongodb");

  const client = new MongoClient(url);
  const dbName = "groupRoles";
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  return db;
}
