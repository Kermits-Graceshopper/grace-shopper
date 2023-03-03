const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cartItem', {
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
});

module.exports = Cart;
