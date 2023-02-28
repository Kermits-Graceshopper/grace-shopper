const Sequelize = require('sequelize');
const db = require('../db');
const Users = require('./users');
const Products = require('./products');

const Cart = db.define('cartItem', {
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: Users,
      key: 'id'
    }
  },
  productId: {
    type: Sequelize.INTEGER,
    references: {
      model: Products,
      key: 'id'
    }
  }
});

module.exports = Cart;
