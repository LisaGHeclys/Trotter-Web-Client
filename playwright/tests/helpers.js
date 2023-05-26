var MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
var url = process.env.MONGO_URI;

export const seedDb = async () => {
  let client;

  try {
    // Use connect method to connect to the Server
    client = await MongoClient.connect(url);

    const db = client.db("TrotterDB");
    await db
      .collection("users")
      .deleteMany({ Email: "playwright@trotter.app" });
  } catch (err) {
    console.log(err.stack);
  }

  if (client) {
    client.close();
  }
};
