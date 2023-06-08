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
    await db
      .collection("users")
      .deleteMany({ Email: "playwright-login@trotter.app" });
    await db.collection("users").insertOne({
      Email: "playwright-login@trotter.app",
      Password: "$2a$10$noaktlifqQENDoLZ8rZMjOvOMz0GbSaMLpVvODWDZiyQpPwpMyFey"
    });
  } catch (err) {
    console.log(err.stack);
  }

  if (client) {
    client.close();
  }
};
