const router = require("express").Router();
const { User, Car } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const carData = await Car.findAll();

    const cars = carData.map((carInfo) => carInfo.get({ plain: true }));

    res.render("dealer-inventory", {
      inventory: true,
      title: "Inventory",
      cars,
      loggedIn: req.session.loggedIn,
      layout: "main.handlebars",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
