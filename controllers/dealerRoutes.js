const router = require("express").Router();
const { User, Car } = require("../models");
const withAuth = require("../utils/auth");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });
const fs = require("fs");

//returns home dashboard page
router.get("/", withAuth, async (req, res) => {
  try {
    const totalCars = await Car.count({ where: { sold: false } });
    const soldCars = await Car.count({ where: { sold: true } });

    res.render("dealer", {
      home: true,
      totalCars,
      soldCars,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//returns the form for a new car
router.get("/newcar", withAuth, async (req, res) => {
  try {
    //if logged in

    res.render("dealer-carform", {
      newcar: true,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//returns all inventory for inventory tab
router.get("/inventory", withAuth, async (req, res) => {
  try {
    const carData = await Car.findAll({
      where: {
        sold: false,
      },
    });

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

//returns all sold inventory
router.get("/sold", withAuth, async (req, res) => {
  try {
    const carData = await Car.findAll({
      where: {
        sold: true,
      },
    });

    const cars = carData.map((carInfo) => carInfo.get({ plain: true }));

    res.render("dealer-inventory", {
      soldcars: true,
      title: "Sold Cars",
      cars,
      loggedIn: req.session.loggedIn,
      layout: "main.handlebars",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//returns specific car by ID
router.get("/:id", withAuth, async (req, res) => {
  try {
    const carData = await Car.findByPk(req.params.id);
    const car = carData.get({ plain: true });
    console.log(car);
    res.render("dealer-profile", {
      inventory: true,
      car,
      loggedIn: req.session.loggedIn,
      layout: "main.handlebars",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//POST route to add a new car
router.post("/newcar", upload.single("file-upload"), async (req, res) => {
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
      condition_of_car: req.body.condition_of_car,
      //image: req.file.mimetype,
      sold: false,
    }).then((newCar) => {
      res.render("dealer-confirm", {
        newCar,
        layout: "main.handlebars",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//marks car as sold
router.put("/:id", async (req, res) => {
  try {
    const updateCar = await Car.update(
      {
        sold: true,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.redirect("/dealer/inventory");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
