import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import {
	fetchAllProductsAsync,
	selectAllProducts
} from "../../app/reducers/allProductsSlice";
import { selectUser } from "../../app/reducers/userSlice";
import { Button } from "react-bootstrap";

const ShoppingCart = () => {
	const [cart, setCart] = useState([]);
  let runningTotal = 0;
	// let cartProducts = [
	//   { id: 1, name: 'Elden Ring', price: 10.99, quantity: 2 },
	//   { id: 2, name: 'Dark Souls', price: 10.99, quantity: 2 },
	//   { id: 3, name: 'Diablo II', price: 10.99, quantity: 2 }
	// ];
	const products = useSelector(selectAllProducts);
	// const navigate = useNavigate();
	const user = useSelector(selectUser);
	const isLoggedIn = user.isLoggedIn;
	const dispatch = useDispatch();
	//   const cartProducts = useSelector(selectCartProducts); //! IMPORT FROM REDUX

	//   useEffect(() => {
	//     dispatch(fetchCartProductsAsync()); //! IMPORT FROM REDUX
	//   }, []);

	const handleCheckout = async () => {
		try {
			await axios
				.post(
					"/api/checkout",
					{
						cart: cart
					},
					{
						headers: {
							"Access-Control-Allow-Origin": "*"
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
		const getCart = async () => {
			let ip;
			if (!isLoggedIn) {
				await axios
					.get("https://api.ipify.org")
					.then((response) => (ip = response.data));
				console.log("IP VARIABLE FROM WISHLIST.JS USEEFFECT: ", ip);
			}
			let data;
			console.log("user: ", user);
			console.log("isLoggedIn: ", isLoggedIn);
			isLoggedIn
				? (data = await axios.get("/api/cart", {
						params: {
							userId: user.id
						}
				  }))
				: (data = await axios.get("/api/cart", {
						params: {
							guestId: ip
						}
				  }));
			console.log("(cart) data.data: ", data.data);
			setCart(data.data);
		};
		getCart();
		dispatch(fetchAllProductsAsync());
	}, []);
	console.log("products: ", products);
	console.log("cart: ", cart);
	return (
		<div className="changingBody">
			<h1> Cart</h1>
			<div className="productContainer">
				{cart[0] ? (
					cart.map((item) => (
						products
							? products.map(product => (
									item.productId === product.id ? (
										<div className="cartItem">
											<h3>{product.name}</h3>
											<img src={product.imageUrl} />
											<h5>${product.price}</h5>
                      <h5>Quantity: {item.quantity}</h5>
                      <p className='priceCalc'>{runningTotal = runningTotal + product.price * item.quantity}</p>
										</div>
									) : null
							  ))
							: null
          ))
				) : (
					<h2>Your cart is empty!</h2>
				)}
			</div>
			<div>
				<div>
					<div className="cartTitle">
						<h2>
							Order Summary <br />
							{/* <div>{`Subtotal: (${cartProducts.length}items)`}</div> */}
						</h2>
						<hr />
						<h2>Subtotal: ${runningTotal.toFixed(2)}</h2>
					</div>
					<hr />
					<Button
						className="coButton"
						variant="primary"
						size="lg"
						onClick={handleCheckout}>
						Proceed to checkout
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ShoppingCart;
