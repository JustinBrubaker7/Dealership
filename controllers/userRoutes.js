const router = require("express").Router();
const { User, Car, Review } = require("../models");

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

    const cars = carData.map((carInfo) => carInfo.get({ plain: true }));

    res.render("user-inventory", {
      logged_in: req.session.logged_in,
      user: userPass,
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

module.exports = router;
