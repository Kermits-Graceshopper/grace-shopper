const router = require('express').Router();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

router.post('/', async (req, res) => {
  try {
    const lineItems = req.body.cart.map((obj) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: obj.name
          },
          unit_amount: obj.price * 100
        },
        quantity: obj.quantity
      };
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: 'http://localhost:8080/success',
      cancel_url: 'http://localhost:8080/cart'
    });
    // res.redirect(session.url);

    res.json({
      sessionUrl: session.url
    });
  } catch (e) {
    console.log('some error');
    console.log(e);
  }
});

module.exports = router;
