const carData = require("./carData.json");
const reviewData = require("./reviewData.json");
const userData = require("./userData.json");
const sequelize = require("../config/connection");
const Car = require("../models/car");
const Review = require("../models/Review");
const User = require("../models/User");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    await Car.bulkCreate(carData, {
      individualHooks: true,
      returning: true,
    });

    await Review.bulkCreate(reviewData, {
      individualHooks: true,
      returning: true,
    });

    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    process.exit(0);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

seedDatabase();
