const schema = require("../schemas/ProfileSchema");
const mongoose = require("mongoose");

const Profile = mongoose.model("Stores", schema);

module.exports = Profile;
