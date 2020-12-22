const express = require("express");
const Post = require("../database/models/PostModel");
const router = express.Router();

router
  .route("/upload")

  .post((req, res) => {
    let data = req.body;
    let newPost = new Post(data);

    newPost.save((error) => {
      if (error) {
        res.send("Something went wrong in saving data");
      } else {
        res.send(JSON.stringify(req.body) + "Data received successfully.");
      }
    });
  });

router.route("/").get((req, res) => {
  Post.find({})
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
});

module.exports = router;
