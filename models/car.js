const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Car extends Model {}

Car.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Added Color and Interior Color
    color: {
      type: DataTypes.STRING,
    },
    interior_color: {
      type: DataTypes.STRING,
    },
    make: {
      type: DataTypes.STRING,
    },
    model: {
      type: DataTypes.STRING,
    },
    car_year: {
      type: DataTypes.INTEGER,
    },
    trim: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Changed a typo
    mileage: {
      // Changed to decimal here
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
    },
    vin: {
      // Changed to string here
      type: DataTypes.STRING,
      allowNull: false,
    },
    condition_of_car: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.BLOB,
    },
    sold: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "car",
  }
);

module.exports = Car;
