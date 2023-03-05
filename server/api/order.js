const { Orders } = require("../db");
const router = require("express").Router();

// '/' is mounted on '/orders' already.
router.get("/", async (req, res) => {
	try {
		const cart = await Orders.findAll({
			where: {
				isCompleted: false
			}
		});
		res.send(cart);
	} catch (e) {
		console.log(e);
	}
});

router.get("/wishlist", async (req, res) => {
	try {
		const wishList = Orders.findAll({
			where: {
				isWishList: true
			}
		});
		res.send(wishList);
	} catch (e) {
		console.log(e);
	}
});

router.get("/history", async (req, res) => {
	try {
		const history = Orders.findAll({
			where: {
				isCompleted: true
			}
		});
		res.send(history);
	} catch (e) {
		console.log(e);
	}
});

module.exports = router;
