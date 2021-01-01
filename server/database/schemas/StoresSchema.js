const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  companyName: { type: String, required: true },
  slogan: { type: String, required: true },
  category: { type: String, required: true },
  logo: {
    type: String,
  },
  appLink: { type: String, required: true },
});

module.exports = schema;
