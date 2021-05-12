const User = require("./User");
const Car = require("./car");
const Review = require("./Review");

// Where we put relationship from cars to users

User.hasMany(Car, {
  foreignKey: "user_id",
});

Car.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Review, {
  foreignKey: "user_id",
});

module.exports = { Car, User, Review };
