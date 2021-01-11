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
        res
          .status(500)
          .json({ msg: "Error appeared while saving data." + error });
        return;
      }
      res.send(
        JSON.stringify(req.body) +
          "Profile has been created with the given data."
      );
    });
  });

router.route("/stores:val").get((req, res) => {
  const companyName = req.params.val;
  Stores.find({ companyName })

    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log("Error" + err);
    });
});

router.route("/:phone").get((req, res) => {
  const mobile = parseInt(req.params.phone);
  Stores.find({ mobile })
    .then((data) => {
      console.log("Data retrieved successfully ");
      res.json(data);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
});

module.exports = router;
