const mongoose = require("mongoose");
// const Schema = mongoose.Schema();

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },

  date: {
    type: String,
    default: Date.now(),
  },
});

module.exports = schema;
