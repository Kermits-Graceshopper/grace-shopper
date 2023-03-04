import React from 'react';
import { Link } from 'react-router-dom';

function CheckoutSuccess() {
  return (
    <div>
      <h1>Thank you for your order!</h1>
      <Link to={`/home`}>Continue Shopping</Link>
    </div>
  );
}
//! MAY NEED TO ADD SPACE FOR FOOTER TO RENDER BETTER
export default CheckoutSuccess;
