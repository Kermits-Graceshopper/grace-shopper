const Users = require('./users');
const Products = require('./products');
const Reviews = require('./reviews');
const Orders = require('./orders');
const Categories = require('./categories');
const UserAddresses = require('./userAddress');
const Cart = require('./cart');

// import all models

// define relationships here

Categories.hasMany(Products)

Products.belongsTo(Categories)
Products.hasMany(Cart)
Products.hasMany(Orders)
Products.hasMany(Reviews)

Users.hasOne(Cart)
Users.hasMany(Orders)
Users.belongsTo(UserAddresses);
Users.hasMany(Reviews)

UserAddresses.hasMany(Users);

Cart.belongsTo(Users)
Cart.belongsTo(Products)

Orders.belongsTo(Users)
Orders.belongsTo(Products)

Reviews.belongsTo(Users)
Reviews.belongsTo(Products)


module.exports = {
  Users,
  Products,
  Reviews,
  Orders,
  Categories,
  UserAddresses,
  Cart,
}
