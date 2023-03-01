const { Products } = require('../db/models')
const router = require('express').Router()

// all "/products" routes go here

router.get('/products', async (req, res) => {
  try {
    res.send('hi');
    // const allProducts = await Products.findAll();
    // res.send(allProducts);
  } catch(e){
    console.log(e);
  }
})

router.get('/products/:productId', async (req, res) => {
  try{
    const product = await Products.findOne({
      where: {
        id: req.params.productId
      }
    });
    res.send(product);
  } catch(e){
    console.log(e);
  }
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router;


