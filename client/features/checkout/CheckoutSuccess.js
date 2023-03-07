import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function CheckoutSuccess() {
	const isLoggedIn = sessionStorage.getItem('accessToken') ? true : false;
	useEffect(() => {
		if (
			!sessionStorage.getItem('accessToken') &&
			!sessionStorage.getItem('guestId')
		) {
			sessionStorage.setItem('guestId', uuidv4());
		}
	}, []);
	//! cart post route here?
	return (
		<div>
			<h1>Thank you for your order!</h1>
			<Link to={`/home`}>Continue Shopping</Link>
		</div>
	);
}
//! MAY NEED TO ADD SPACE FOR FOOTER TO RENDER BETTER
export default CheckoutSuccess;
