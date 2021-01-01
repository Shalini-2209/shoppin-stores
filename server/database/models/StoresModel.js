const schema = require("../schemas/StoresSchema");
const mongoose = require("mongoose");

const Profile = mongoose.model("Stores", schema);

module.exports = Profile;
