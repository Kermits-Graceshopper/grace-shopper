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
  } catch(e){
    console.log(e);
  }
});


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


router.delete("/:productId", async (req, res) => {
  try {
    await Products.destroy({
      where: {
        id: req.params.productId
      }
    });
    const allProducts = await Products.findAll()
    res.send(allProducts);
  } catch(e){
    console.log(e);
  }
})

router.put("/:productId", async (req, res) => {
  try {
    const { name, description, price, imageUrl, category, productId } = req.body
    console.log('req.body.name : ', name)
    console.log('req.body.description : ', description)
    console.log('req.body.price : ', price)
    console.log('req.body.imageUrl : ', imageUrl)
    console.log('req.body.category : ', category)
    console.log('req.body.productId : ', productId)
    const product = await Products.findOne({
      where: {
        id: productId
      }
    })
    product.name = name;
    product.description = description;
    product.price = price;
    product.imageUrl = imageUrl;
    product.category = category;
    await product.save();
    res.send(product);
  } catch(e){
    console.log('ERROR IN CATCH OF ROUTER.PUT("/:PRODUCTID")', e);
  }
})


router.post('/', async (req, res) => {
  try{
    const { name, imageUrl, price, description } = req.body;
    await Products.create({
      name,
      imageUrl,
      price,
      description
    });
    const updated = await Products.findAll();
    res.send(updated)
  } catch(e){
    console.log('error in catch of post (add product) backend catch: ', e);
  }
})

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

(module.exports = router), apicalypse;
