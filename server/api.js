//Routes
const router = express.Router();

router.post("/newProduct", (req, res) => {
  res.json({
    msg: "We received your data",
  });
});

module.exports = router;
