const { Products } = require("../db/models");
const router = require("express").Router();
const apicalypse = require("apicalypse").default;

// all "/products" routes go here

router.get("/", async (req, res) => {
	try {
		// first get api data

		// const requestOptions = {
		//   queryMethod: "url",
		//   method: "get",
		//   baseURL: "https://api.igdb.com/v4",
		//   headers: {
		//     Accept: "application/json",
		//     Authorization: "Bearer xq93gjmuu4d3gmckti4k4ziqi632nw",
		//     "Client-ID": "cbp9b79dpahqpwj67jav97dtdnrbk6",
		//     grant_type: "client_credentials",
		//     client_secret: "8nq1gjsfylziqbjnlknfbt201pnslj"
		//   },
		//   responseType: "json",
		//   timeout: 1000, // 1 second timeout
		// };

		// const response = await apicalypse(requestOptions)
		//   .fields(['name'])
		//   // .query('category')
		//   .request('/games')
		//   .limit(10);
		// res.json(response.data);

		// const response = await apicalypse(requestOptions)
		// .fields(
		//     "age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,popularity,pulse_count,rating,rating_count,release_dates,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites"
		// )

		// .sort("first_release_date", "desc")
		// .where("first_release_date != null & first_release_date < 1595490518")
		// .limit(20)
		// res.json(response.data);

		// then put that info into db ??

		// return the data to be mapped over in component to be displayed

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

router.use((req, res, next) => {
	const error = new Error("Not Found");
	error.status = 404;
	next(error);
});

(module.exports = router), apicalypse;
