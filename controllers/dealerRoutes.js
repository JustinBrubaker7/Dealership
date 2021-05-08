const router = require("express").Router();
const { User, Car } = require("../models");

router.get("/", async (req, res) => {
  try {
    res.send("hello world");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
