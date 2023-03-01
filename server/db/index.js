const db = require("./db");
const { Users, Products, Orders, Reviews, Categories, UserAddresses, Cart, } = require("./models");
const seed = require("../../script/seed");

const syncDb = async () => {
  try {
    await db.sync({ force: true});
    console.log("SUCCESS, db has been synced");
    // await db.seed()
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
