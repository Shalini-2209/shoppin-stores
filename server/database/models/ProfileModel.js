const schema = require("../schemas/ProfileSchema");
const mongoose = require("mongoose");

const Profile = mongoose.model("Profile", schema);

module.exports = Profile;
