const carData = require("./carData.json");
const sequelize = require("../config/connection");
const Car = require("../models/car");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Car.bulkCreate(carData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
