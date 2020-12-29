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

module.exports = router;
