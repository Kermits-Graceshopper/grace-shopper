import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchAllProductsAsync,
	selectAllProducts
} from "../../app/reducers/allProductsSlice";
import { selectUser } from "../../app/reducers/userSlice";
import axios from "../api/axios";
import { v4 as uuidv4 } from "uuid";

const Wishlist = () => {
  const isLoggedIn = sessionStorage.getItem("accessToken") ? true : false;
	const [wishlist, setWishlist] = useState([]);
	// const user = useSelector(selectUser);
	// const isLoggedIn = user.isLoggedIn;
	const dispatch = useDispatch();
	const products = useSelector(selectAllProducts);

	useEffect(() => {
		const getOldWishlist = async () => {
			// let ip;
			// if (!isLoggedIn) {
			// 	await axios
			// 		.get("https://api.ipify.org")
			// 		.then((response) => (ip = response.data));
			// }
			let data;
			isLoggedIn
				? (data = await axios.get("/api/wishlist", {
						params: {
							userId: sessionStorage.getItem('userId')
						}
				  }))
				: (data = await axios.get("/api/wishlist", {
						params: {
							guestId: sessionStorage.getItem('guestId')
						}
				  }));
			setWishlist(data.data);
		};
		getOldWishlist();
		dispatch(fetchAllProductsAsync());
	}, []);
	useEffect(() => {
		if (
			!sessionStorage.getItem("accessToken") &&
			!sessionStorage.getItem("guestId")
		) {
			sessionStorage.setItem("guestId", uuidv4());
		}
	}, []);
	return (
		<div className="changingBody">
      <h1>Wishlist</h1>
			{wishlist ? (
				wishlist.map((wishListItem) =>
					products.map((product) =>
						product.id === wishListItem.productId ? (
							<div className="wishlistDiv">
								<h1>{product.name}</h1>
								<img src={product.imageUrl} />
								<h3>${product.price}</h3>
								<h4>{product.category}</h4>
								<p>{product.description}</p>
								<h5>Quantity: {wishListItem.quantity}</h5>
							</div>
						) : null
					)
				)
			) : (
				<h2>There is nothing in your wishlist!</h2>
			)}
		</div>
	);
};

export default Wishlist;
