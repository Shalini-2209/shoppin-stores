const mongoose = require("mongoose");
// const Schema = mongoose.Schema();

const schema = new mongoose.Schema({
  name: String,
  price: Number,
  //   date: {
  //     type: String,
  //     default: Date.now(),
  //   },
});

module.exports = schema;
