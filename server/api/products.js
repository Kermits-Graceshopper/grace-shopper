const { Products } = require("../db/models");
const router = require("express").Router();
const getToken = require("./utils/game");
require("dotenv").config();
const axios = require("axios");

// all "/products" routes go here

router.get("/", (req, res) => {
  return axios({
    url: `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`,
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((results) => {
      return axios({
        url: "https://api.igdb.com/v4/games",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Client-ID": process.env.CLIENT_ID,
          Authorization: `Bearer ${results.data.access_token}`,
        },
        data: `fields name, first_release_date, summary, platforms, category, genres, category, cover, rating, rating_count, screenshots.*; limit 15; where`,
      });
    })
    .then((response) => {
      res.json({ data: response.data });
    })
    .catch((err) => {
      // console.error(err);
      res.send("Error");
    });
});

router.get("/:productId", (req, res) => {
  try {
    const product = Products.findOne({
      where: {
        id: req.params.productId,
      },
    });
    res.send(product);
  } catch (e) {
    console.log(e);
  }
});



		// first get api data

		// then put that info into db ??

		// return the data to be mapped over in component to be displayed

		
router.get("/", async (req, res) => {
	try {
		const allProducts = await Products.findAll();
		res.send(allProducts);
	} catch (e) {
		console.log(e);
	}
});

router.get("/:productId", async (req, res) => {
	try {
		const product = await Products.findByPk(req.params.productId);
		res.send(product);
	} catch (e) {
		console.log(e);
	}
});

router.delete("/:productId", async (req, res) => {
	try {
		await Products.destroy({
			where: {
				id: req.params.productId
			}
		});
		const allProducts = await Products.findAll();
		res.send(allProducts);
	} catch (e) {
		console.log(e);
	}
});

router.put("/:productId", async (req, res) => {
	try {
		const { newName, newDescription, newPrice, newImageUrl, newCategory } =
			req.body;
		const product = await Products.findOne({
			where: {
				id: req.params.productId
			}
		});
		product.name = newName;
		product.description = newDescription;
		product.price = newPrice;
		product.imageUrl = newImageUrl;
		product.category = newCategory;
		await product.save();
		res.send(product);
	} catch (e) {
		console.log('ERROR IN CATCH OF ROUTER.PUT("/:PRODUCTID")', e);
	}
});

router.post("/", async (req, res) => {
	try {
		const { name, description, price, imageUrl, category } = req.body;
		await Products.create({
			name,
      description,
      price,
			imageUrl,
			category
		});
		const updated = await Products.findAll();
		res.send(updated);
	} catch (e) {
		console.log("error in catch of post (add product) backend catch: ", e);
	}
});

// router.post("/:productId", async (req, res) => {
// 	try {
//     const { quantity, wishList, userId } = req.body
//     const product = await Products.findByPk(req.params.productId);
//     wishList
// 			? await Orders.create({
// 					quantity,
// 					isCompleted: false,
// 					isWishList: true,
// 					productId: product.id,
// 					userId
// 			  })
// 			: await Orders.create({
// 					quantity,
// 					isCompleted: false,
// 					isWishList: false,
// 					productId: product.id,
//           userId
// 			  });
//         res.sendStatus(200);
// 	} catch (e) {
// 		console.log("error in catch of post route to add to cart backend catch: ", e);
// 	}
// });


router.use((req, res, next) => {
	const error = new Error("Not Found");
	error.status = 404;
	next(error);
});

module.exports = router;
