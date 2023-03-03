const Sequelize = require('sequelize')
const db = require('../db');
// const Categories = require('./categories');

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
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://media.wired.com/photos/6064cff8204aaa18f97554cd/master/w_2560%2Cc_limit/culture_gamestock_15318126.jpg' 
  },
  platform: {
    type: Sequelize.STRING,
    allowNull: true
  },
  // categoryId: {
  //   type: Sequelize.INTEGER,
  //   reference: {
  //     model: Categories,
  //     key: 'id'
  //   }
  // }
})

module.exports = Products;