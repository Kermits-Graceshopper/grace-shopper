"use strict";

const { db } = require("../server/db");
const {
  Users,
  Products,
  Orders,
  UserAddresses,
  Categories,
  Cart,
  Reviews,
  WishLists,
} = require("../server/db/models");

const users = [
  {
    email: "user1@test.com",
    password: "password123",
    fname: "John",
    lname: "Doe",
    isAdmin: false,
  },
  {
    email: "admin@test.com",
    password: "password123",
    fname: "Jane",
    lname: "Doe",
    isAdmin: true,
  },
];

const products =[
  {
    name: "Product 1",
    description: "This is product 1",
    price: 9.99,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    name: "Product 2",
    description: "This is product 2",
    price: 19.99,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    name: "Product 3",
    description: "This is product 3",
    price: 29.99,
    imageUrl: "https://via.placeholder.com/150",
  },
];

const orders =  Users.createProducts([
  {
    orderDate: new Date(),
    userId: 1,
    productId: 1,
  },
  {
    orderDate: new Date(),
    userId: 1,
    productId: 2,
  },
  {
    orderDate: new Date(),
    userId: 2,
    productId: 3,
  },
]);

const addresses = [
  {
    streetAddress: "123 Main St",
    city: "San Diego",
    state: "CA",
    zip: 12345,
    userId: 1,
  },
  {
    streetAddress: "456 Broadway Ave",
    city: "New York",
    state: "NY",
    zip: 67890,
    userId: 2,
  },
  {
    streetAddress: "789 Elm St",
    city: "Orlando",
    state: "FL",
    zip: 23456,
    userId: 2,
  },
];

const cart = [
  {
    qty: 5,
    userId: 1,
    productId: 1,
  },
  {
    qty: 3,
    userId: 1,
    productId: 2,
  },
  {
    qty: 1,
    userId: 1,
    productId: 3,
  },
  {
    qty: 3,
    userId: 1,
    productId: 2,
  },
  {
    qty: 1,
    userId: 2,
    productId: 3,
  },
];
const wishlists = [
  {
    userId: 2,
    productId: 2,
  },
  {
    userId: 2,
    productId: 3,
  },
  {
    userId: 1,
    productId: 2,
  },
  {
    userId: 2,
    productId: 2,
  },
  {
    userId: 2,
    productId: 1,
  },
];
const reviews = [
  {
    rating: 5,
    comment: "Terrible",
    userId: 1,
    productId: 1,
  },
  {
    rating: 3,
    comment: "Awesome",
    userId: 1,
    productId: 2,
  },
  {
    rating: 1,
    comment: "Useful",
    userId: 2,
    productId: 3,
  },
];

const categories = [
  { category: "PS5", productId: 2 },
  { category: "XBOX", productId: 2 },
  { category: "Nintendo", productId: 2 },
];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  const createdUsers = await Users.bulkCreate(users, { returning: true });
  console.log(`seeded ${createdUsers.length} users`);

  const createdProducts = await Products.bulkCreate(products, {
    returning: true,
  });
  console.log(`seeded ${createdProducts.length} products`);

  const createdOrders = await Orders.bulkCreate(orders, { returning: true });
  console.log(`seeded ${createdOrders.length} orders`);

  const createdAddresses = await UserAddresses.bulkCreate(addresses, {
    returning: true,
  });
  console.log(`seeded ${createdAddresses.length} addresses`);

  const createdCart = await Cart.bulkCreate(cart, { returning: true });
  console.log(`seeded ${createdCart.length} cart`);

  const createdCategories = await Categories.bulkCreate(categories, {
    returning: true,
  });
  console.log(`seeded ${createdCategories.length} categories`);

  const createdReviews = await Reviews.bulkCreate(reviews, { returning: true });
  console.log(`seeded ${createdReviews.length} reviews`);

  const createdWishLists = await WishLists.bulkCreate(wishlists, {
    returning: true,
  });
  console.log(`seeded ${createdWishLists.length} reviews`);

  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;

