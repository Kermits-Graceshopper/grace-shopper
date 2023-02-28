const db = require('../db');
const Sequelize = require('sequelize');
const Users = require('./users');

const UserPaymentDetails = db.define('userPaymentDetail', {});

module.exports = UserPaymentDetails;
