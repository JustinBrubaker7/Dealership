const router = require("express").Router();
const { User, Car, Review } = require("../models");

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

router.get("/review", async (req, res) => {
  try {
    const reviewData = await Review.findAll();

    const reviews = reviewData.map((reviewInfo) =>
      reviewInfo.get({ plain: true })
    );

    res.render("user-reviews", {
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
    res.render("user-about", {
      layout: "user-main.handlebars",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  try {
    res.render("user-login", {
      layout: "user-main.handlebars",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/signup", async (req, res) => {
  try {
    res.render("user-signup", {
      layout: "user-main.handlebars",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/api/newuser", async (req, res) => {
  try {
    await User.create({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }).then((newUser) => {
      res.json(newUser);
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
