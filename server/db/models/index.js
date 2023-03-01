const Users = require('./users');
const Products = require('./products');
const Reviews = require('./reviews');
const Orders = require('./orders');
const Categories = require('./categories');
const WishLists = require('./wishList');
const UserAddresses = require('./userAddress');
const Cart = require('./cart');
const UserPayments = require('./userPaymentDetails');
const CartItems = require('./cartItems');
const OrderItems = require('./orderItems');


// import all models

// define relationships here


Categories.hasMany(Products)
Categories.hasMany(Users)

Products.belongsTo(Categories)
Products.belongsTo(Users)
// Products.belongsToMany(Cart, { through: CartItems })
// Products.belongsToMany(Orders, { through: OrderItems })
// Products.belongsToMany(Reviews, { through: ProductReviews })

Users.hasMany(Categories)
Users.hasMany(Products)
Users.hasOne(Cart)
Users.hasMany(Orders)
Users.hasOne(UserAddresses);
// Users.belongsToMany(Reviews, { through: ProductReviews, targetKey: `${fname} ${lname}`, foreignKey: 'author' })

UserAddresses.hasMany(Users); //! Can have multiple users that live together

Cart.belongsTo(Users)
// Cart.belongsToMany(Products, { through: CartItems } )

Orders.belongsTo(Users)
// Orders.belongsToMany(Products, { through: OrderItems })

Reviews.belongsTo(Users)
Reviews.belongsTo(Products)


//!UserPaymentDetails

module.exports = {
  Users,
  Products,
  Reviews,
  Orders,
  Categories,
  WishLists,
  UserAddresses,
  Cart,
  UserPayments,
  CartItems,
  OrderItems
}
