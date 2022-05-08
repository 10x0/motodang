"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };
    }
  }
  Order.init(
    {
      _id: DataTypes.STRING,
      buyer: DataTypes.STRING,
      email: DataTypes.STRING,
      country: DataTypes.STRING,
      total: DataTypes.FLOAT,
      status: { type: DataTypes.STRING, defaultValue: "pending" },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
