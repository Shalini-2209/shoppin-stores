const { Mongoose } = require("mongoose");
const schema = require("../schemas/Post");
const mongoose = require("mongoose");

const Post = mongoose.model("Post", schema);

module.exports = Post;
