const { Products } = require('../db/models')
const router = require('express').Router()

// all "/products" routes go here
// "/products" will already be mounted on this router so "/" here will really be "/products"

router.get('/', async (req, res) => {
  try {
    const allProducts = await Products.findAll();
    res.send(allProducts);
  } catch(e){
    console.log(e);
  }
})

router.get('/:productId', (req, res) => {
  try{
    const product = Products.findOne({
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


