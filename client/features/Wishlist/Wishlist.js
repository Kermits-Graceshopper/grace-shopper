import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchAllProductsAsync,
	selectAllProducts
} from "../../app/reducers/allProductsSlice";
import { selectUser } from "../../app/reducers/userSlice";
import {
	clearWishlistOnLogout,
	renewUsersWishlist,
	selectWishlist
} from "../../app/reducers/wishListSlice";
import axios from "../api/axios";

const Wishlist = () => {
	const [wishlist, setWishlist] = useState([]);
	const user = useSelector(selectUser);
	const isLoggedIn = user.isLoggedIn;
	const dispatch = useDispatch();
	// const wishlist = useSelector(selectWishlist);
	const products = useSelector(selectAllProducts);
	console.log("wishlist: ", wishlist);
	console.log("products: ", products);

	useEffect(() => {
		const getOldWishlist = async () => {
			let ip;
			if (!isLoggedIn) {
				await axios
					.get("https://api.ipify.org")
					.then((response) => (ip = response.data));
				console.log("IP VARIABLE FROM WISHLIST.JS USEEFFECT: ", ip);
			}
			let data;
			console.log("user: ", user);
      console.log('isLoggedIn: ', isLoggedIn);
			isLoggedIn
				? (data = await axios
						.get("/api/wishlist", {
							params: {
								userId: user.id
							}
						}))
				: (data = await axios.get("/api/wishlist", {
						params: {
							guestId: ip
						}
				  }));
			console.log("data.data: ", data.data);
			setWishlist(data.data);
		};
		// setWishlist(getOldWishlist());
		getOldWishlist();
		dispatch(fetchAllProductsAsync());
	}, []);
	console.log("wishlist: ", wishlist);
	return (
		<div className="changingBody">
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
