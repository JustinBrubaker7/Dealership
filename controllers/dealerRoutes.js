const router = require("express").Router();
const { User, Car } = require("../models");
//dealer
//user

router.get("/", async (req, res) => {
  try {
    //if logged in

    res.render("dealer", { home: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/inventory", async (req, res) => {
  try {
    const carData = await Car.findAll();

    const cars = carData.map((carInfo) => carInfo.get({ plain: true }));

    res.render("dealer-inventory", {
      inventory: true,
      cars,
      layout: "main.handlebars",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/newcar", async (req, res) => {
  try {
    res.render("dealer-newcar", {
      newcar: true,
      layout: "main.handlebars",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/newcar", async (req, res) => {
  try {
    // post car data
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
