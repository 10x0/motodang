"use strict";
const bcrypt = require("bcryptjs");
const { Model } = require("sequelize");
const ErrorHandler = require("../handlers/error.handler");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
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
        password: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };
    }
  }
  User.init(
    {
      _id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      name: { type: DataTypes.STRING, allowNull: false },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUnique: (value, next) => {
            User.findOne({ where: { username: value } })
              .then((user) => {
                if (user) {
                  next(new ErrorHandler("Username already in use.", 409));
                }
                next();
              })
              .catch((error) => next(error));
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Invalid email.",
          },
          isUnique: (value, next) => {
            User.findOne({ where: { email: value } })
              .then((user) => {
                if (user) {
                  next(new ErrorHandler("Email already in use.", 409));
                }
                next();
              })
              .catch((error) => next(error));
          },
        },
      },
      password: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.STRING, defaultValue: "customer" },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.addHook("beforeCreate", async (user) => {
    user.password = await bcrypt.hash(user.password, 12);
  });

  User.validatePassword = async function (providedPassword, actualPassword) {
    return await bcrypt.compare(providedPassword, actualPassword);
  };

  return User;
};
