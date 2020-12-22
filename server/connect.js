const express = require("express");
const mongoose = require("mongoose");
// const { getData } = require("./routes/api");
const uploadPost = require("./routes/uploadPost");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();
const db = mongoose.connection;
const mongo_url = process.env.MONGO_URL;
mongoose.connect(mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "connection error:"));
db.on("connected", function () {
  console.log("Connected successfully to server");
});

app.get("/", (req, res) => {
  res.send("Port is running...");
});

app.use("/posts", uploadPost);

app.listen(3001, () => {
  console.log("Running on port..no 3001");
});
