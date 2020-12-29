const schema = require("../schemas/RegisterSchema");
const mongoose = require("mongoose");

const User = mongoose.model("Users", schema);

module.exports = User;
