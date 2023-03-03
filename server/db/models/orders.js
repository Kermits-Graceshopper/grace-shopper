const Sequelize = require('sequelize')
const db = require('../db');
const Products = require('./products');
const Users = require('./users');

const Orders = db.define('order', {
  // needs... junction table? for storing multiple products in one order
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  isCompleted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isWishList: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  // productId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   reference: {
  //     model: Products,
  //     key: 'id'
  //   }
  // },
  // userId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   reference: {
  //     model: Users,
  //     key: 'id'
  //   }
  // }
});



module.exports = Orders