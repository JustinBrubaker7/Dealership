const router = require("express").Router();
const { User } = require("../models");

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dealer");
    return;
  }

  res.render("login");
});

module.exports = router;
