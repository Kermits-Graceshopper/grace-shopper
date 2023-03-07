import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { fetchAllProductsAsync } from '../../app/reducers/allProductsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllProducts } from '../../app/reducers/allProductsSlice';
import { Link } from 'react-router-dom';

const Featured = () => {
	const [pageMessage, setPageMessage] = useState('Loading...');
	const isLoggedIn = sessionStorage.getItem('accessToken') ? true : false;
	const dispatch = useDispatch();
	const products = useSelector(selectAllProducts);

	useEffect(() => {
		dispatch(fetchAllProductsAsync());
		setTimeout(() => {
			setPageMessage('There are currently no featured products.');
		}, 3000);
		if (!sessionStorage.getItem('accessToken') && !sessionStorage.getItem('guestId')) {
			sessionStorage.setItem('guestId', uuidv4());
		}
	}, []);

	const featuredProducts = (products) => {
		return products.slice(-15);
	};
	const slicedProducts = featuredProducts(products);

	return (
		<div>
			<div className="bodyContent">
				<h1> Featured</h1>
				<div className="productContainer">
					{slicedProducts.length
						? slicedProducts.map((product) => {
								return (
									<div className="singleProduct" key={product.id}>
										<h3>
											<Link to={`/products/${product.id}`}>{product.name}</Link>
										</h3>
										<img className="singleProductImg" src={product.imageUrl} />
										<h6>{product.price}</h6>
										<h6>Category: {product.category}</h6>
									</div>
								);
						  })
						: pageMessage}
				</div>
			</div>
		</div>
	);
};

export default Featured;
