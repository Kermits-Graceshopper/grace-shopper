const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('order', {
    // needs... junction table? for storing multiple products in one order
})

module.exports = Orders;