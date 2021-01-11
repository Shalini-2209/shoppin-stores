const express = require("express");
const Post = require("../database/models/PostModel");
const router = express.Router();

const app = express();

router.route("/upload").post((req, res) => {
  let newPost = new Post(req.body);

  newPost.save((error) => {
    if (error) {
      return res.status(500).json({ msg: "Error appeared while saving data." });
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

router.route("/store:val").get((req, res) => {
  const store = req.params.val;
  Post.find({ store })

    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log("Error" + err);
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
