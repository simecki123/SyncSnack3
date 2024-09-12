export async function getClientMongo() {
  const url = `${process.env.MONGODB}`;
  const { MongoClient } = require("mongodb");

  const client = new MongoClient(url);
  await client.connect();
  console.log("Connected successfully to server");
  return client;
}
