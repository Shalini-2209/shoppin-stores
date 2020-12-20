//Routes
const router = express.Router();

router.post("/newProduct", (req, res) => {
  console.log("Body: ", req.body);
  res.json({
    msg: "We received your data",
  });
});

module.exports = router;
