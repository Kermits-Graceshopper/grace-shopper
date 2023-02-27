const Sequelize = require('sequelize');
const db = require('../db');
const Users = require('./users');
const Products = require('./products');

const Reviews = db.define('review', {
    rating: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
            isNumeric: true,
            isDecimal: false,
            max: 5,
            min: 0
        }
    },
    comment: {
        type: Sequelize.TEXT,
        allowNull: true,
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

module.exports = Reviews;