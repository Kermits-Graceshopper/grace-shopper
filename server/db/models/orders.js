const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('order', {
  order: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
  }
})