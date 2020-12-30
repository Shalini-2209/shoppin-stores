const express = require("express");
const User = require("../database/models/RegisterModel");
const router = express.Router();

router
  .route("/newUser")

  .post((req, res) => {
    let data = req.body;
    let newUser = new User(data);

    newUser.save((error) => {
      if (error) {
        console.log("Error", error);
        res.status(500).json({ msg: "Error appeared while registering." });
        return;
      }
      res.send(JSON.stringify(req.body) + "Data received successfully.");
    });
  });

router.route("/").get((req, res) => {
  User.find({})
    .then((data) => {
      console.log("Data retrieved successfully ");
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
});

router.route("/users").post((req, res) => {
  let user = req.body;
  User.find({ mobile: user.mobile })
    .then((data) => {
      if (data.mobile == user.mobile && data.password == user.password) {
        console.log("Data retrieved successfully ", data);
        res.json(data);
      } else {
        res.send("");
      }
    })
    .catch((error) => {
      console.log("error: ", error);
    });
});

module.exports = router;
