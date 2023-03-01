const db = require("../db");
const Sequelize = require("sequelize");

const Users = db.define("user", {
  fullName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  fname: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  lname: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  refreshToken: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
});

module.exports = Users;
