const express = require("express");
let router = express.Router();

router
  .route("/")

  .post((req, res) => {
    res.send("Data received successfully.");
    res.json({
      msg: "We received your data",
    });
  });

module.exports = router;
