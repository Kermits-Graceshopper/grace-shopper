const Users = require('./users');
const Products = require('./products');
const Reviews = require('./reviews');
const Orders = require('./orders');
const Categories = require('./categories');
const UserAddresses = require('./userAddress');
const Cart = require('./cart');
const UserPayments = require('./userPaymentDetails');


// import all models

// define relationships here

// associations for Categories
Categories.hasMany(Products)

// associations for Products
Products.belongsTo(Categories)
Products.hasMany(Cart)
Products.hasMany(Orders)
Products.hasMany(Reviews)

// associations for Users
Users.hasOne(Cart)
Users.hasMany(Orders)
Users.belongsTo(UserAddresses);
Users.hasMany(Reviews)

// associations for UserAddresses
UserAddresses.hasMany(Users);

// associations for Cart
Cart.belongsTo(Users)
Cart.belongsTo(Products)

// associations for Orders
Orders.belongsTo(Users)
Orders.belongsTo(Products)

// associations for Reviews
Reviews.belongsTo(Users)
Reviews.belongsTo(Products)



//!UserPaymentDetails

module.exports = {
  Users,
  Products,
  Reviews,
  Orders,
  Categories,
  UserAddresses,
  Cart,
}
