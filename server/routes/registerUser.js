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
  const { mobile, password } = req.body;

  if (!mobile || !password) return res.send({ isLogged: false });

  User.find({ mobile, password })
    .then((data) => {
      if (data.length == 0) {
        return res.send(data);
      }
      console.log("::: Data retrieved successfully :::", data);
      res.send(data);
    })
    .catch((error) => {
      console.warn("error: ", error);
    });
});

module.exports = router;
