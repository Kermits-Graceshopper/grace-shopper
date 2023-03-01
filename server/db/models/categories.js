const db = require("../db");
const Sequelize = require("sequelize");

const Categories = db.define("category", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});
module.exports = Categories;
