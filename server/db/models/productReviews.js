const Sequelize = require('sequelize');
const db = require('../db');
const Users = require('./users');
const Products = require('./products');
const Reviews = require('./reviews');

const ProductReviews = db.define('review', {
    // id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true
    //   },
    author: {
        type: Sequelize.STRING,
        references: {
            model: Users,
            key: 'fullName'
        },
    },
    productId: {
        type: Sequelize.INTEGER,
        references: {
            model: Products,
            key: 'name'
        }
    }
});

module.exports = ProductReviews;