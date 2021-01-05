const mongoose = require("mongoose");
// const Schema = mongoose.Schema();

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  mobile: { type: Number },
  store: { type: String, required: true },

  date: {
    type: String,
    default: Date.now(),
  },

  image: {
    type: String,
    required: true,
  },
});

module.exports = schema;
