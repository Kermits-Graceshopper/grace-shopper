const Users = require('./users');
const Products = require('./products');
const Reviews = require('./reviews');
const Orders = require('./orders');
const Categories = require('./categories');
const WishLists = require('./wishList');
const UserAddresses = require('./userAddress');
const Cart = require('./cart');
const UserPayments = require('./userPaymentDetails');

// import all models

// define relationships here
UserAddresses.hasMany(Users); //! Can have multiple users that live together
Users.hasOne(UserAddresses);

Users.hasOne(Cart);
Cart.hasOne(Users);

Cart.hasMany(Products);
Products.hasOne(Cart);

WishLists.hasOne(Users);
Users.hasOne(WishLists);

WishLists.hasMany(Products);
Products.hasOne(WishLists);

Users.hasMany(Orders);
Orders.hasOne(Users);

Users.hasMany(Reviews);
Reviews.hasOne(Users);

Reviews.hasOne(Products);
Products.hasMany(Reviews);

Orders.hasMany(Products);
Products.hasOne(Orders);

Products.hasOne(Categories);
Categories.hasOne(Products);

//!UserPaymentDetails

module.exports = {
  Users,
  Products,
  Reviews,
  Orders
};
