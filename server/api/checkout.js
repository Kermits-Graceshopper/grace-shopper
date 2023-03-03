const router = require('express').Router();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

router.post('/checkout', async (req, res) => {
  const items = req.body.cartProducts;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel'
  });

  res.send(
    JSON.stringify({
      url: session.url
    })
  );
});

module.exports = router;
