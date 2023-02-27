const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('products', {
  order: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
  }
})