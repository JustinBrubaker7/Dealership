const router = require("express").Router();
const { User, Car } = require("../models");
const withAuth = require("../utils/auth");
//dealer
//user

//returns home dashboard page
router.get("/", withAuth, async (req, res) => {
  try {
    //if logged in

    res.render("dealer", {
      home: true,
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
    console.log(carData);
    const cars = carData.get({ plain: true });
    console.log(cars);
    res.render("dealer-profile", {
      inventory: true,
      cars,
      loggedIn: req.session.loggedIn,
      layout: "main.handlebars",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/update/:id", withAuth, async (req, res) => {
  try {
    console.log("made it tot the back end");
    const updateCar = await Car.update(
      {
        sold: true,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((updateCar) => {
      res.redirect(200, "/dealer");

      res.status(200).json(updateCar);
      console.log("sending..");
    });

    res.end();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//returns view to submit a new car
router.get("/newcar", withAuth, async (req, res) => {
  try {
    res.render("dealer-newcar", {
      newcar: true,
      loggedIn: req.session.loggedIn,
      layout: "main.handlebars",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//POST route to add a new car
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

module.exports = router;
