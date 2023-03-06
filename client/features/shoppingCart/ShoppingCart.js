import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../api/axios';
import {
	fetchAllProductsAsync,
	selectAllProducts
} from '../../app/reducers/allProductsSlice';
import { selectUser } from '../../app/reducers/userSlice';
import { Button } from 'react-bootstrap';

const ShoppingCart = () => {
	const [cart, setCart] = useState([]);
	const [pageMessage, setPageMessage] = useState('Loading...');
	let runningTotal = 0;

	const products = useSelector(selectAllProducts);
	const user = useSelector(selectUser);
	const isLoggedIn = user.isLoggedIn;
	const dispatch = useDispatch();

	const stripeItems = cart.map((item) => {
		const product = products.find((product) => product.id === item.productId);
		const price = parseFloat(product.price);
		return {
			id: item.productId,
			name: product.name,
			imageUrl: product.imageUrl,
			price: price,
			quantity: item.quantity
		};
	});

	let userEmail = null;
	const userToken = sessionStorage.getItem('accessToken');
	if (userToken) {
		userEmail = sessionStorage.getItem('email');
	}

	const handleCheckout = async () => {
		try {
			await axios
				.post(
					'/api/checkout',
					{
						cart: stripeItems,
						email: userEmail
					},
					{
						headers: {
							'Access-Control-Allow-Origin': '*'
						}
					}
				)
				.then((response) => {
					console.log(response);
					if (response.data.sessionUrl) {
						window.location.replace(response.data.sessionUrl); // Forwarding user to Stripe
					}
				});
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(() => {
		setTimeout(() => {
			setPageMessage('There are no items in your cart!');
		}, 1000);
		const getCart = async () => {
			let ip;
			if (!isLoggedIn) {
				await axios
					.get('https://api.ipify.org')
					.then((response) => (ip = response.data));
				console.log('IP VARIABLE FROM WISHLIST.JS USEEFFECT: ', ip);
			}
			let data;
			console.log('user: ', user);
			console.log('isLoggedIn: ', isLoggedIn);
			isLoggedIn
				? (data = await axios.get('/api/cart', {
						params: {
							userId: user.id
						}
				  }))
				: (data = await axios.get('/api/cart', {
						params: {
							guestId: ip
						}
				  }));
			setCart(data.data);
		};
		getCart();
		dispatch(fetchAllProductsAsync());
	}, []);

	return (
		<div className="changingBody">
			<h1> Cart</h1>
			<div className="productContainer">
				{cart[0] ? (
					cart.map((item) =>
						products
							? products.map((product) =>
									item.productId === product.id ? (
										<div className="cartItem">
											<h3>{product.name}</h3>
											<img src={product.imageUrl} />
											<h5>${product.price}</h5>
											<h5>Quantity: {item.quantity}</h5>
											<p className="priceCalc">
												{
													(runningTotal =
														runningTotal + product.price * item.quantity)
												}
											</p>
										</div>
									) : null
							  )
							: null
					)
				) : (
					<h2>{pageMessage}</h2>
				)}
			</div>
			<div>
				<div>
					<div className="cartTitle">
						<h2>
							Order Summary <br />
						</h2>
						<hr />
						<h2>Subtotal: ${runningTotal.toFixed(2)}</h2>
					</div>
					<hr />
					{cart[0] ? (
						<Button
							className="coButton"
							variant="primary"
							size="lg"
							onClick={handleCheckout}
						>
							Proceed to checkout
						</Button>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
};

export default ShoppingCart;
