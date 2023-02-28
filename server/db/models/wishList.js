const Sequelize = require('sequelize');
const db = require('../db');
const Users = require('./users');
const Products = require('./products');

const WishLists = db.define('wishlist', {
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
module.exports = WishLists;