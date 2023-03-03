const Users = require('./users');
const Products = require('./products');
const Reviews = require('./reviews');
const Orders = require('./orders');
const UserAddresses = require('./userAddress');

// import all models

// define relationships here

Products.hasMany(Orders)
Products.hasMany(Reviews)

Users.hasMany(Orders)
Users.belongsTo(UserAddresses);
Users.hasMany(Reviews)

UserAddresses.hasMany(Users);

Orders.belongsTo(Users)
Orders.belongsTo(Products)

Reviews.belongsTo(Users)
Reviews.belongsTo(Products)


module.exports = {
  Users,
  Products,
  Reviews,
  Orders,
  UserAddresses,
}
