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
    console.log(req.body);
    const newCarCreate = await Car.create({
      color: req.body.color,
      interior_color: req.body.interior_color,
      make: req.body.make,
      model: req.body.model,
      car_year: req.body.car_year,
      trim: req.body.trim,
      price: req.body.price,
      mileage: req.body.mileage,
      vin: req.body.vin,
      image: req.body.image,
      sold: false,
    }).then((newCar) => {
      res.json(newCar);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
