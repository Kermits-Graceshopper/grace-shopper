const router = require('express').Router();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

router.post('/', async (req, res, next) => {
  try {
    const cart = req.body.cart;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: cart.lineitems.map((item) => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.events[0].name
            },
            unit_amount: Math.floor(item.events[0].price * 100)
          },
          quantity: item.qty
        };
      }),
      success_url: `${process.env.PAGE_URL}/success`,
      cancel_url: `${process.env.PAGE_URL}/canceled`
    });
    res.json({ url: session.url });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
