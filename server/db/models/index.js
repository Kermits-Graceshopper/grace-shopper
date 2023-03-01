const Users = require('./users');
const Products = require('./products');
const Reviews = require('./reviews');
const Orders = require('./orders');
const Categories = require('./categories');
const WishLists = require('./wishList');
const UserAddresses = require('./userAddress');
const Cart = require('./cart');
const UserPayments = require('./userPaymentDetails');
// const CartItems = require('./cartItems')
// const OrderItems = require('./orderItems')
// const ProductReviews = require('./productReviews')

// import all models

// define relationships here


// associations for Categories
Categories.hasMany(Products)
Categories.belongsToMany(Users, {through: Categories})

// associations for Products
Products.belongsTo(Categories)
Products.belongsTo(Users)
Products.belongsToMany(Cart, { through: "CartItems" })
Products.belongsToMany(Orders, { through: "OrderItems" })
Products.belongsToMany(Reviews, { through: "ProductReviews" })

// associations for Users
Users.hasMany(Categories, {through: Categories })
Users.hasMany(Products)
Users.hasOne(Cart)
Users.hasMany(Orders)
Users.hasOne(UserAddresses);
Users.belongsToMany(Reviews, { through: ProductReviews })

// associations for UserAddresses
UserAddresses.belongsTo(Users);

// associations for Cart
Cart.belongsTo(Users)
Cart.belongsToMany(Products, { through: CartItems } )

// associations for Orders
Orders.belongsTo(Users)
Orders.belongsToMany(Products, { through: OrderItems })

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
  WishLists,
  UserAddresses,
  Cart,
  UserPayments,
  CartItems,
  OrderItems,
  ProductReviews
}
