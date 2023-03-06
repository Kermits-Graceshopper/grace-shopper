const { Orders } = require("../db");

const router = require("express").Router();

// '/' is mounted on '/wishlist'
router.get("/", async (req, res) => {
	try {
        console.log('req.query.guestId: ', req.query.guestId);
        let list;
        req.query.userId
        ? list = await Orders.findAll({
			where: {
				isWishList: true,
				userId: req.query.userId
			}
		}) 
        : list = await Orders.findAll({
            where: {
                isWishList: true,
                guestId: req.query.guestId
            }
        })
        console.log('list: ', list);
		res.send(list);
	} catch (e) {
		console.log(e);
	}
});

// adding item to orders table as a wishList item
router.post("/", async (req, res) => {
	try {
    let createdItem;
		req.body.userId
			? createdItem = await Orders.create({
					quantity: req.body.quantity,
					isWishList: true,
					productId: req.body.productId,
					userId: req.body.userId
			  })
			: createdItem = await Orders.create({
					quantity: req.body.quantity,
					isWishList: true,
					productId: req.body.productId,
                    guestId: req.body.guestId
			  });
		res.send(createdItem);
	} catch (e) {
		console.log("ERROR IN POST WISHLIST ROUTE: ", e);
	}
});

router.delete("/", async (req, res) => {
	try {
		const { productId, userId } = req.body;
		const item = await Orders.findOne({
			where: {
				productId,
				userId
			}
		});
		await Orders.destroy(item);
		const newWishlist = await Orders.findAll({
			where: {
				isWishList: true
			}
		});
		res.send(newWishlist);
	} catch (e) {
		console.log("ERROR IN CATCH OF WISHLIST DELETE ROUTE: ", e);
	}
});

module.exports = router;
