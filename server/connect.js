const express = require("express");
const { MongoClient } = require("mongodb");
// const bodyParser = require("body-parser");
// const cors = require("cors");

require("dotenv").config();

const app = express();
const mongo_url = process.env.MONGO_URL;
const client = new MongoClient(mongo_url, { useUnifiedTopology: true });

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// app.use(cors());

app.get("/", (req, res) => {
  res.send("Port is running...");
});

app.listen(3001, () => {
  console.log("Running on port..no 3001");
});
//git remote add origin https://github.com/Shalini-CEG/Insta-stores.git
