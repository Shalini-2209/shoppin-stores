const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userName: { type: String, required: true },
  mobile: { type: Number, required: true },
  password: { type: String, required: true },
});

module.exports = schema;
