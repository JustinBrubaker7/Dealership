const router = require("express").Router();
const { User, Car, Review, StoredCar } = require("../models");

router.get("/", async (req, res) => {
  try {
    let loggedUser;
    let userPass = "Jack";

    if (req.session.user_id) {
      loggedUser = await User.findAll({
        where: {
          id: req.session.user_id,
        },
        raw: true,
      });
      console.log(loggedUser[0]);
      userPass = loggedUser[0];
    }

    res.render("user-homepage", {
      logged_in: req.session.logged_in,
      user: userPass,
      layout: "user-main.handlebars",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Inventory Route
router.get("/inventory", async (req, res) => {
  try {
    const carData = await Car.findAll();

    let loggedUser;
    let userPass = "Jack";

    if (req.session.user_id) {
      loggedUser = await User.findAll({
        where: {
          id: req.session.user_id,
        },
        raw: true,
      });
      console.log(loggedUser[0]);
      userPass = loggedUser[0];
    }

    const storageData = await StoredCar.findAll({});

    const cars = carData.map((carInfo) => carInfo.get({ plain: true }));
    const storedCars = storageData.map((storeInfo) =>
      storeInfo.get({ plain: true })
    );

    let newStorageCars = [];
    // Make a new array based on date
    console.log("-----------------------------------------------");
    for (i = 10; i > 0; i--) {
      if (storedCars[i - 1]) {
        console.log(storedCars[i - 1]);
        newStorageCars.push(storedCars[i - 1]);
      }
    }
    console.log(newStorageCars);

    res.render("user-inventory", {
      logged_in: req.session.logged_in,
      user: userPass,
      newStorageCars,
      cars,
      layout: "user-main.handlebars",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Inventory Specific Route
router.get("/inventory/:id", async (req, res) => {
  try {
    let loggedUser;
    let userPass = "Jack";

    if (req.session.user_id) {
      loggedUser = await User.findAll({
        where: {
          id: req.session.user_id,
        },
        raw: true,
      });
      console.log(loggedUser[0]);
      userPass = loggedUser[0];
    }

    const thisCar = await Car.findAll({
      where: {
        id: req.params.id,
      },
      raw: true,
    });

    let car = thisCar[0];

    let newStorageCars = await StoredCar.findAll();

    const storedCars = newStorageCars.map((storeInfo) =>
      storeInfo.get({ plain: true })
    );

    // Check if stored car already exists in list
    let checkStorage = await StoredCar.findAll({
      where: {
        id: car.id,
      },
    });

    if (checkStorage.length === 0) {
      // Store cars
      await StoredCar.create({
        id: car.id,
        color: car.color,
        interior_color: car.interior_color,
        make: car.make,
        model: car.model,
        car_year: car.car_year,
        trim: car.trim,
        price: car.price,
        mileage: car.mileage,
        vin: car.vin,
        condition_of_car: car.condition_of_car,
        image: car.image,
        url: car.url,
        sold: car.sold,
      });
    }

    res.render("user-specific-inventory", {
      logged_in: req.session.logged_in,
      user: userPass,
      storedCars,
      car,
      layout: "user-main.handlebars",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Inventory Search Car Route
router.get("/inventory/search/:make", async (req, res) => {
  try {
    let loggedUser;
    let userPass = "Jack";

    if (req.session.user_id) {
      loggedUser = await User.findAll({
        where: {
          id: req.session.user_id,
        },
        raw: true,
      });
      console.log(loggedUser[0]);
      userPass = loggedUser[0];
    }

    const thisCar = await Car.findAll({
      where: {
        make: req.params.make,
      },
    });

    let newStorageCars = await StoredCar.findAll();

    const storedCars = newStorageCars.map((storedInfo) =>
      storedInfo.get({ plain: true })
    );

    const cars = thisCar.map((storeInfo) => storeInfo.get({ plain: true }));

    console.log(cars);
    res.render("user-inventory", {
      logged_in: req.session.logged_in,
      user: userPass,
      storedCars,
      cars,
      layout: "user-main.handlebars",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Review route
router.get("/review", async (req, res) => {
  try {
    let loggedUser;
    let userPass = "Jack";

    if (req.session.user_id) {
      loggedUser = await User.findAll({
        where: {
          id: req.session.user_id,
        },
        raw: true,
      });
      console.log(loggedUser[0]);
      userPass = loggedUser[0];
    }

    const reviewData = await Review.findAll();

    const reviews = reviewData.map((reviewInfo) =>
      reviewInfo.get({ plain: true })
    );

    res.render("user-reviews", {
      logged_in: req.session.logged_in,
      user: userPass,
      reviews,
      layout: "user-main.handlebars",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/about", async (req, res) => {
  try {
    let loggedUser;
    let userPass = "Jack";

    if (req.session.user_id) {
      loggedUser = await User.findAll({
        where: {
          id: req.session.user_id,
        },
        raw: true,
      });
      console.log(loggedUser[0]);
      userPass = loggedUser[0];
    }

    res.render("user-about", {
      logged_in: req.session.logged_in,
      user: userPass,
      layout: "user-main.handlebars",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login Routes -------------------------------------
router.get("/signup", async (req, res) => {
  try {
    let loggedUser;
    let userPass = "Jack";

    if (req.session.user_id) {
      loggedUser = await User.findAll({
        where: {
          id: req.session.user_id,
        },
        raw: true,
      });
      console.log(loggedUser[0]);
      userPass = loggedUser[0];
    }
    res.render("user-signup", {
      logged_in: req.session.logged_in,
      user: userPass,
      layout: "user-main.handlebars",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  try {
    let loggedUser;
    let userPass = "Jack";

    if (req.session.user_id) {
      loggedUser = await User.findAll({
        where: {
          id: req.session.user_id,
        },
        raw: true,
      });
      console.log(loggedUser[0]);
      userPass = loggedUser[0];
    }
    res.render("user-login", {
      logged_in: req.session.logged_in,
      user: userPass,
      layout: "user-main.handlebars",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Forgot my password Routes
router.get("/email", async (req, res) => {
  try {
    let loggedUser;
    let userPass = "Jack";

    if (req.session.user_id) {
      loggedUser = await User.findAll({
        where: {
          id: req.session.user_id,
        },
        raw: true,
      });
      console.log(loggedUser[0]);
      userPass = loggedUser[0];
    }
    res.render("user-forgotpassword", {
      logged_in: req.session.logged_in,
      user: userPass,
      layout: "user-main.handlebars",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/password/:email", async (req, res) => {
  try {
    let loggedUser;
    let userPass = "Jack";
    let email = req.params.email;

    if (req.session.user_id) {
      loggedUser = await User.findAll({
        where: {
          id: req.session.user_id,
        },
        raw: true,
      });
      console.log(loggedUser[0]);
      userPass = loggedUser[0];
    }
    res.render("user-newpassword", {
      logged_in: req.session.logged_in,
      email: email,
      user: userPass,
      layout: "user-main.handlebars",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Search route

module.exports = router;
