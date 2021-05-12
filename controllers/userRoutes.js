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
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    const reviews = reviewData.map((reviewInfo) =>
      reviewInfo.get({ plain: true })
    );
    const users = userData.map((userInfo) => userInfo.get({ plain: true }));

    for (i = 0; i < reviewData.length; i++) {
      for (x = 0; x < userData.length; x++) {
        if (reviewData[i].user_id === userData[x].id) {
          reviewData[i] = {
            user_id_username: userData[x].username,
          };
          console.log(userData[x].username);
        }
      }
    }

    res.render("user-reviews", {
      reviews,
      users,
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

module.exports = router;
