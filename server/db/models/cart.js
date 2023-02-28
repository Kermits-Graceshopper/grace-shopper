const Sequelize = require('sequelize');
const db = require('../db');
const Users = require('./users');
const Products = require('./products');

const CartItems = db.define('cartItem', {
  
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

module.exports = CartItems