const Sequelize = require('sequelize')
const db = require('../db');
const Categories = require('./categories');

const Products = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  // category: {
  //   type: Sequelize.ENUM({
  //     values: ['xbox', 'ps5', 'nintendo']
  //   }),
    // references: {
    //   model: Categories,
    //   key: 'id'
    // }
  // },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://media.wired.com/photos/6064cff8204aaa18f97554cd/master/w_2560%2Cc_limit/culture_gamestock_15318126.jpg' 
  },
})

module.exports = Products;