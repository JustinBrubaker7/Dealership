const router = require("express").Router();
const { User } = require("../models");



router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dealer");
    return;
  }

  res.render("login");
});

router.get("/register", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dealer");
    return;
  }

  res.render("register");
});

router.post("/register", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
