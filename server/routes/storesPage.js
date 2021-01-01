const express = require("express");
const Stores = require("../database/models/StoresModel");
const router = express.Router();

router
  .route("/create")

  .post((req, res) => {
    let data = req.body;
    let newStore = new Stores(data);

    newStore.save((error) => {
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
  Stores.find({})
    .then((data) => {
      console.log("Data retrieved successfully ");
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
});

module.exports = router;
