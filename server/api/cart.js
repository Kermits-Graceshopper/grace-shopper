const router = require('express').Router();
const { Orders } = require('../db');

router.get('/', async (req, res) => {
	try {
		console.log('req.query.guestId: ', req.query.guestId);
		let list;
		req.query.userId
			? (list = await Orders.findAll({
					where: {
						isCompleted: false,
						userId: req.query.userId,
						guestId: null,
						isCartItem: true
					}
			  }))
			: (list = await Orders.findAll({
					where: {
						isCompleted: false,
						guestId: req.query.guestId,
						userId: null,
						isCartItem: true
					}
			  }));
		res.send(list);
	} catch (e) {
		console.log('ERROR IN CATCH OF CART GET ROUTE: ', e);
	}
});

router.post('/', async (req, res) => {
	try {
		// const { quantity, productId, userId, guestId } = req.body;
		let created;
		req.body.userId
			? (created = await Orders.create({
					quantity: req.body.quantity,
					productId: req.body.productId,
					userId: req.body.userId,
					isCartItem: true
			  }))
			: (created = await Orders.create({
					quantity: req.body.quantity,
					productId: req.body.productId,
					guestId: req.body.guestId,
					isCartItem: true
			  }));
		res.send(created);
	} catch (e) {
		console.log('ERROR IN POST CART ROUTE: ', e);
	}
});

router.delete('/', async (req, res) => {
	try {
		if (req.query.isLoggedIn) {
			const product = await Orders.findOne({
				where: {
					productId: req.query.Id,
					userId: parseInt(req.query.user)
				}
			});
			console.log('product', product);
			await product.update({ isCartItem: false }).save();
		} else {
			const product = await Orders.findOne({
				where: {
					productId: req.query.Id,
					guestId: parseInt(req.query.user)
				}
			});
			await product.update({ isCartItem: false }).save();
		}
		const newCart = await Orders.findAll({
			where: {
				isCartItem: true
			}
		});
		res.send(newCart);
	} catch (e) {
		console.log('ERROR IN CATCH OF CART DELETE ROUTE: ', e);
	}
});

module.exports = router;
