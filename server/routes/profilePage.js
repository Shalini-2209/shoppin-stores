const express = require("express");
const Profile = require("../database/models/ProfileModel");
const router = express.Router();

router
  .route("/create")

  .post((req, res) => {
    let data = req.body;
    let newProfile = new Profile(data);

    newProfile.save((error) => {
      if (error) {
        res.status(500).json({ msg: "Error appeared while saving data." });
        return;
      }
      res.send(
        JSON.stringify(req.body) +
          "Profile has been created with the given data."
      );
    });
  });

router.route("/").get((req, res) => {
  Profile.find({})
    .then((data) => {
      console.log("Data retrieved successfully ");
      res.json(data);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
});

module.exports = router;
