const router = require("express").Router();
const { User, Car } = require("../models");
//dealer
//user

//returns hom dashboard page
router.get("/", async (req, res) => {
  try {
    //if logged in

    res.render("dealer", { home: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//returns all inventory for inventory tab
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

//returns specific car by ID
// router.get("/inventory/:id", async (req, res) => {
//   try {
//     const carData = await Car.findByPk(req.params.id);

//     const cars = carData.map((carInfo) => carInfo.get({ plain: true }));

//     res.render("dealer-carprofile", {
//       cars,
//       layout: "main.handlebars",
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.put("/update/:id", async (req, res) => {
  try {
    console.log("made it tot the back end");
    const updateCar = await Car.update(
      {
        sold: 1,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((updateCar) => {
      // res.render("dealer-inventory", {
      //   updateCar,
      //   layout: "main.handlebars",
      // });
      res.redirect("back");
    });

    // console.log("we did it");
    // res.redirect("200", "/dealer");
    // res.status(200).json(updateCar);
    // res.render("dealer-inventory", {
    //   layout: "main.handlebars",
    // });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//returns view to submit a new car
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
