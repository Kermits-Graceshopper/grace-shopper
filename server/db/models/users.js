const db = require('../db')
const Sequelize = require('sequelize');

const Users = db.define('user', {
    // id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    //     allowNull: false,
    //   },
    fname: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: true,
        }
    },
    lname: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: true,
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    refreshToken: {
        type: Sequelize.TEXT,
        allowNull: true
    }
});

module.exports = Users