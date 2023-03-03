const { Products } = require("../db/models");
const router = require("express").Router();
const apicalypse = require("apicalypse").default;

// all "/products" routes go here

router.get("/", async (req, res) => {
  try {
    // first get api data

    // const requestOptions = {
    //   queryMethod: "url",
    //   method: "get", // The default is `get`
    //   baseURL: "https://api.igdb.com/v4",
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: "Bearer 2xgejwyu5ixxxm9ywrp0do96e3hgyh",
    //     "Client-ID": "cbp9b79dpahqpwj67jav97dtdnrbk6",
    //   },
    //   responseType: "json",
    //   timeout: 1000, // 1 second timeout
    // };

    // const response = await apicalypse(requestOptions)
    //   .fields([
    //     "age_ratings",
    //     "category",
    //     "cover",
    //     "first_release_date",
    //     "genres",
    //     "involved_companies",
    //     "name",
    //     "rating",
    //   ])
    //   // .query('category')
    //   // .request('/games')
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

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

(module.exports = router), apicalypse;
