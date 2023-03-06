const { Orders } = require("../db");

const router = require("express").Router();

// '/' is mounted on '/wishlist'
router.get("/", async (req, res) => {
	try {
        const { userId } = req.params;
		const wishlist = await Orders.findAll({
			where: {
				isWishList: true,
                userId
			}
		});
		res.send(wishlist);
	} catch (e) {
		console.log(e);
	}
});

// adding item to orders table as a wishList item
router.post("/", async (req, res) => {
	try {
		const { userId, quantity, productId } = req.body;
		await Orders.create({
			quantity,
			isWishList: true,
            productId,
			userId
		});
        res.sendStatus(200);
	} catch (e) {
		console.log("ERROR IN POST WISHLIST ROUTE: ", e);
	}
});

router.delete('/', async (req, res) => {
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
    } catch(e) {
        console.log('ERROR IN CATCH OF WISHLIST DELETE ROUTE: ', e);
    }
})

module.exports = router;
