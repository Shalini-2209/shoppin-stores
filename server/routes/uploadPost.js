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
        res.status(500).json({ msg: "Error appeared while saving data." });
        return;
      }
      res.send(JSON.stringify(req.body) + "Data received successfully.");
    });
  });

router.route("/").get((req, res) => {
  Post.find({})
    .then((data) => {
      console.log("Data retrieved successfully ");
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
});

router.route("/users:phone").get((req, res) => {
  const mobile = parseInt(req.params.phone);
  Post.find({ mobile })
    .then((data) => {
      console.log("Posts retrieved successfully ");
      res.json(data);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
});
module.exports = router;
