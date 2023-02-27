const Users = require('./users');
const Products = require('./products');
const Reviews = require('./reviews');
const Orders = require('./orders');
// import all models

// define relationships here
Users.hasMany(Orders);
Orders.belongsTo(Users);

Orders.hasMany(Products);
Products.belongsTo(Orders);

Products.hasMany(Reviews);
Reviews.belongsTo(Products);

Orders.hasMany(Products);
Products.belongsTo(Orders);

module.exports = {
    Users,
    Products,
    Reviews,
    Orders
}