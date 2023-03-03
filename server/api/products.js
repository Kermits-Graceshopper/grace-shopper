const { Products } = require("../db/models");
const router = require("express").Router();
const Categories = require("../db/models/categories");
// const apicalypse = require('apicalypse');
const apicalypse = require("apicalypse").default;

// all "/products" routes go here

router.get("/", async (req, res) => {
  try {
    const allProducts = await Products.findAll();
    res.send(allProducts);
  } catch(e){
    console.log(e);
  }
});
// use this temporarily

router.get("/:productId", (req, res) => {
  try {
    const product = Products.findOne({
      where: {
        id: req.params.productId,
      },
    });
    res.send(product);
  } catch(e){
    console.log(e);
  }
})

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

(module.exports = router), apicalypse;
