import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Featured = () => {
  const isLoggedIn = sessionStorage.getItem('accessToken') ? true : false;
	let featured = [
		{
			name: "product1",
			price: "$19.99"
		},
		{
			name: "product2",
			price: "$69.99"
		},
		{
			name: "product3",
			price: "$99.99"
		},
		{
			name: "product4",
			price: "$32.99"
		},
		{
			name: "product5",
			price: "$96.34"
		},
		{
			name: "product6",
			price: "$26.99"
		},
		{
			name: "product7",
			price: "$26.99"
		},
		{
			name: "product8",
			price: "$26.99"
		}
	];
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
						: "nope"}
				</div>
			</div>
		</div>
	);
};

export default Featured;
