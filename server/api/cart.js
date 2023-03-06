const router = require("express").Router();
const { Orders } = require("../db");

router.get("/", async (req, res) => {
	try {
    const { userId } = req.body;
		const cart = await Orders.findAll({
			where: {
				isCompleted: false,
				isWishlist: false,
        userId
			}
		});
		res.send(cart);
	} catch (e) {
		console.log(e);
	}
});

router.post("/", async (req, res) => {
	try {
		const { quantity, productId, userId } = req.body;
		await Orders.create({
			quantity,
			productId,
			userId
		});
		res.sendStatus(200);
	} catch (e) {
		console.log(e);
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
		res.sendStatus();
	} catch (e) {
		console.log("ERROR IN CATCH OF CART DELETE ROUTE: ", e);
	}
});

module.exports = router;
