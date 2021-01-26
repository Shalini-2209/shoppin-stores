const schema = require("../schemas/PostSchema");
const mongoose = require("mongoose");

const Post = mongoose.model("Post", schema);

module.exports = Post;
