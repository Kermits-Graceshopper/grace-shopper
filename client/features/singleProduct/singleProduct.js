import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchSingleProductAsync,
	selectProduct
} from "../../app/reducers/singleProductSlice";
import { selectUser } from "../../app/reducers/userSlice";
import {
	addToWishlistAsync,
	selectWishlist
} from "../../app/reducers/wishListSlice";
import { v4 as uuidv4 } from "uuid";

const SingleProduct = () => {
	const [error, setError] = useState('');
	const [newName, setNewName] = useState('');
	const [newDescription, setNewDescription] = useState('');
	const [newPrice, setNewPrice] = useState(0);
	const [newImageUrl, setNewImageUrl] = useState('');
	const [newCategory, setNewCategory] = useState('');
	const [toggleSubmitted, setToggleSubmitted] = useState(false);
	const [wishlistSuccess, setWishlistSuccess] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const { id } = useParams();
	const dispatch = useDispatch();

	const currentUser = useSelector(selectUser);
	// const wishlist = useSelector(selectWishlist);
	// console.log("wishlist: ", wishlist);
	const product = useSelector(selectProduct);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			newName === "" ||
			newDescription === "" ||
			newPrice === "" ||
			newImageUrl === "" ||
			newCategory === ""
		) {
			setError("Please fill out all fields and assure imageUrl is a valid URL");
			return;
		}
		await axios.put(`/api/products/${id}`, {
			newName,
			newDescription,
			newPrice,
			newImageUrl,
			newCategory
		});
		setToggleSubmitted(!toggleSubmitted);
	};

	const addToWishlist = async () => {
		let ip;
		await axios.get("https://api.ipify.org").then((response) => ip = response.data);
		console.log('ip variable in addToWishlist function in singleProduct.js: ', ip);
		console.log('currentUser: ', currentUser);
		currentUser.isLoggedIn
			? dispatch(
					addToWishlistAsync({
						userId: currentUser.id,
						quantity,
						productId: product.id
					})
			  )
			: dispatch(
					addToWishlistAsync({
						guestId: ip,
						quantity,
						productId: product.id
					})
			  );
		setWishlistSuccess(true);
		setTimeout(() => {
			setWishlistSuccess(false);
		}, 3000);
	};

	useEffect(() => {
		dispatch(fetchSingleProductAsync(id));
	}, [toggleSubmitted]);

	useEffect(() => {
		setError('');
	}, [newName, newDescription, newPrice, newImageUrl, newCategory]);

	return (
		<div>
			<p>
				Back to <Link to="/products">All Products</Link>
			</p>
			{currentUser.isAdmin ? (
				<div>
					<h1>Edit Product</h1>
					{error !== "" ? (
						<p style={{ backgroundColor: "red" }}>{error}</p>
					) : null}
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit(e);
						}}>
						<label htmlFor="name">Name</label>
						<input
							placeholder="Game name..."
							type="text"
							value={newName}
							onChange={(e) => setNewName(e.target.value)}
						/>
						<label htmlFor="Description">Description</label>
						<input
							placeholder="Description..."
							type="text"
							value={newDescription}
							onChange={(e) => setNewDescription(e.target.value)}
						/>
						<label htmlFor="Price">Price</label>
						<input
							placeholder="Price..."
							type="number"
							value={newPrice}
							onChange={(e) => setNewPrice(e.target.value)}
						/>
						<label htmlFor="imageUrl">imageUrl</label>
						<input
							placeholder="ImageUrl..."
							type="url"
							value={newImageUrl}
							onChange={(e) => setNewImageUrl(e.target.value)}
						/>
						<label>Category</label>
						<select onChange={(e) => setNewCategory(e.target.value)}>
							<option value="">Select Category...</option>
							<option value="XBOX">Xbox</option>
							<option value="Nintendo">Nintendo</option>
							<option value="PS5">PS5</option>
						</select>
						<button className="submitEditButton" type="submit">
							Submit
						</button>
					</form>
				</div>
			) : null}
			<div className="productCard">
				<h1>{product.name}</h1>
				<img className="singleProductImg" src={`${product.imageUrl}`} />
				<h3>Price: {product.price}</h3>
				<h5>{product.category}</h5>
				<p>{product.description}</p>
				<select defaultValue={1} onChange={(e) => setQuantity(e.target.value)}>
					<option value={1}>1</option>
					<option value={2}>2</option>
					<option value={3}>3</option>
					<option value={4}>4</option>
					<option value={5}>5</option>
					<option value={6}>6</option>
					<option value={7}>7</option>
					<option value={8}>8</option>
					<option value={9}>9</option>
					<option value={10}>10</option>
				</select>
				{wishlistSuccess ? (
					<h5 style={{ color: "green" }}>Item has been added to wishlist</h5>
				) : null}
				{/* <button type='button' onClick={}>Add to Cart</button> */}
				<button type="button" onClick={addToWishlist}>
					Add to Wishlist
				</button>
			</div>
		</div>
	);
};

export default SingleProduct;
