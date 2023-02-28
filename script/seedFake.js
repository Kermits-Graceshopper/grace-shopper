'use strict';

const db = require('../server/db');
const { User, Product, Order } = require('../server/db/models');

const users = [
  {
    email: 'user1@test.com',
    password: 'password123',
    fname: 'John',
    lname: 'Doe',
    isAdmin: false,
  },
  {
    email: 'admin@test.com',
    password: 'password123',
    fname: 'Jane',
    lname: 'Doe',
    isAdmin: true,
  },
];

const products = [
  {
    name: 'Product 1',
    description: 'This is product 1',
    price: 9.99,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    title: 'Product 2',
    description: 'This is product 2',
    price: 19.99,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    title: 'Product 3',
    description: 'This is product 3',
    price: 29.99,
    imageUrl: 'https://via.placeholder.com/150',
  },
];

const orders = [
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
];

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const createdUsers = await User.bulkCreate(users, { returning: true });
  console.log(`seeded ${createdUsers.length} users`);

  const createdProducts = await Product.bulkCreate(products, { returning: true });
  console.log(`seeded ${createdProducts.length} products`);

  const createdOrders = await Order.bulkCreate(orders, { returning: true });
  console.log(`seeded ${createdOrders.length} orders`);

  console.log(`seeded successfully`);
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
