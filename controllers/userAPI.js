const router = require("express").Router();
const { User, Car, Review } = require("../models");
require("dotenv").config();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const transporter = require("../public/js/nodemailer");
const { update } = require("../models/User");

// Signup Route
router.post("/signup", async (req, res) => {
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

// Login route
router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const userCheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userCheck.length === 0) {
      res.status(400).json({ message: "Wrong email or password, try again" });
      return;
    }

    const correctPassword = await userCheck.checkPassword(req.body.password);

    if (!correctPassword) {
      res.status(400).json({ message: "Wrong email or password, try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userCheck.id;
      req.session.logged_in = true;
      console.log("Youre logged in");
      res.json({ user: userCheck, message: "You are logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout route
router.post("/logout", async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end;
    });
  } else {
    res.status(404).end();
  }
});

// Forgot password routes ---------------------------------------
router.post("/email", async (req, res) => {
  console.log(req.body);
  let email = req.body.email;

  var mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Change",
    text: `Follow This Link to change your password: http://localhost:3001/user/password/${email}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

router.post("/password", async (req, res) => {
  console.log(req.body);
  let password = req.body.new_password;
  let userEmail = req.body.email;

  newPassword = await bcrypt.hash(password, 10);

  await User.update(
    {
      password: newPassword,
    },
    {
      where: {
        email: userEmail,
      },
    }
  );
});

// Submit review Route -----------------------------------------------
router.post("/review", async (req, res) => {
  console.log(req.body);
  await Review.create({
    rating: req.body.rating,
    content: req.body.content,
    owner_name: req.body.owner_name,
  });
});

module.exports = router;
