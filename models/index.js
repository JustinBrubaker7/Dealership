const User = require("./User");
const Car = require("./car");
const Contact = require("./Contact");
const Review = require("./Review");
const StoredCar = require("./storedCars");

// Where we put relationship from cars to users

User.hasMany(Car, {
  foreignKey: "user_id",
});

Car.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

module.exports = { Car, User, Review, StoredCar, Contact };
