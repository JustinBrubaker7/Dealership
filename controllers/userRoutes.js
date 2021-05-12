const router = require("express").Router();
const { User, Car } = require("../models");

router.get("/", async (req, res) => {
  try {
    res.render("user-homepage", { layout: "user-main.handlebars" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/inventory", async (req, res) => {
  try {
    const carData = await Car.findAll();

    const cars = carData.map((carInfo) => carInfo.get({ plain: true }));

    res.render("user-inventory", {
      cars,
      layout: "user-main.handlebars",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/about", async (req, res) => {
  try {
    const carData = await Car.findAll();

    const cars = carData.map((carInfo) => carInfo.get({ plain: true }));

    res.render("user-inventory", {
      cars,
      layout: "user-main.handlebars",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/about", async (req, res) => {
  try {
    const carData = await Car.findAll();

    const cars = carData.map((carInfo) => carInfo.get({ plain: true }));

    res.render("user-about", {
      cars,
      layout: "user-main.handlebars",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
