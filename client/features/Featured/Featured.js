import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { fetchAllProductsAsync } from '../../app/reducers/allProductsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllProducts } from '../../app/reducers/allProductsSlice';

const Featured = () => {
	const isLoggedIn = sessionStorage.getItem('accessToken') ? true : false;
	const dispatch = dispatch();
	const products = useSelector(selectAllProducts);

	useEffect(() => {
		dispatch(fetchAllProductsAsync());
		if (!sessionStorage.getItem('accessToken') && !sessionStorage.getItem('guestId')) {
			sessionStorage.setItem('guestId', uuidv4());
		}
	}, []);

	return (
		<div className="changingBody">
			<div className="bodyContent">
				<h1> Featured</h1>
				<div className="productContainer">
					{featured.length
						? featured.map((item) => {
								return (
									<div className="product" key={item.name}>
										{item.name}
										{item.price}
									</div>
								);
						  })
						: ''}
				</div>
			</div>
		</div>
	);
};

export default Featured;
