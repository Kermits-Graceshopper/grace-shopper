const db = require('./db')
const { Users, Products, Orders, Reviews, Categories, WishLists, UserAddresses, Cart, UserPayments } = require('./models');


// const syncDb = async () => {
//   try {
//     await db.sync({ force: true})
//     console.log('SUCCESS, db has been synced');
//   } catch(e){
//     console.log("ERROR IN CATCH OF syncDb FUNCTION: ", e);
//   }
// }
// syncDb();


module.exports = {
  db,
  // models: {
    Users,
    Products,
    Reviews,
    Orders,
    Categories,
    WishLists,
    UserAddresses,
    Cart,
    UserPayments
  // },
}
