const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  companyName: { type: String, required: true },
  mobile: { type: Number, required: true },
  slogan: { type: String, required: true },
  category: { type: String },
  logo: {
    type: String,
  },
  appLink: { type: String },
});

module.exports = schema;
