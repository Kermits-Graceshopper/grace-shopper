const db = require('./db')
const { Users, Products, Orders, Reviews } = require('./models');



module.exports = {
  db,
  models: {
    Users,
    Products,
    Orders,
    Reviews
  },
}
