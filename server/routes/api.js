//Routes

const getData = (req, res) => {
  res.send("hello world");
  res.json({
    msg: "We received your data",
  });
};

module.exports = { getData };
