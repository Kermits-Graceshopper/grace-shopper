import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductsAsync } from "../../app/reducers/allProductsSlice";
import { selectUser } from "../../app/reducers/userSlice";
import {
	clearWishlistOnLogout,
	renewUsersWishlist,
	selectWishlist
} from "../../app/reducers/wishListSlice";
import axios from "../api/axios";

const Wishlist = () => {
	const user = useSelector(selectUser);
	const isLoggedIn = user.isLoggedIn;
	const dispatch = useDispatch();
	const wishlist = useSelector(selectWishlist);
	const [products, setProducts] = useState([]);
	useEffect(() => {
		const getOldWishlist = async () => {
			await axios
				.get("/api/wishlist", {
					params: {
						userId: user.id
					}
				})
				.then((res) => dispatch(renewUsersWishlist(res.data)));
		};
		if (isLoggedIn) {
			getOldWishlist();
		} else {
			dispatch(clearWishlistOnLogout());
		}
	}, [isLoggedIn]);
	useEffect(() => {
		const products = dispatch(fetchAllProductsAsync());
		setProducts(products);
	}, []);
	return (
		<div className="changingBody">
			{wishlist ? (
				wishlist.map((wishListItem) =>
					products.map((product) =>
						product.id === wishListItem.productId ? (
							<div>
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
