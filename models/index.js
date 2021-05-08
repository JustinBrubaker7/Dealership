const User = require("./User");
const Car = require("./car");

// Where we put relationship from cars to users

Car.hasMany(User, {
  foreignKey: "car_id",
});

User.belongsTo(Car, {
  foreignKey: "car_id",
});

module.exports = { Car, User };
