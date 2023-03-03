const db = require("./db");
const { Users, Products, Orders, Reviews, Categories, UserAddresses, Cart, } = require("./models");
// const seed = require("../../script/seed");
const {
  seed,
  products,
  categories,
  // users,
  // reviews,
  // cart,
  // addresses,
  // cart,
  // orders
} = require('../../script/seed')

const syncDb = async () => {
  try {
    await db.sync({ force: true });
    products.map(product => {
      Products.create({
        name: product.name,
        description: product.description,
        price: product.price,
        platform: product.platform
      })
    })
    categories.map(cat => {
      Categories.create({
        name: cat.name
      })
    })
    console.log("SUCCESS, db has been synced");
    
  } catch (e) {
    console.log("ERROR IN CATCH OF syncDb FUNCTION: ", e);
  }
};
syncDb();

module.exports = {
    db,
    Users,
    Products,
    Orders,
    Reviews,
    Categories,
    UserAddresses,
    Cart
};
