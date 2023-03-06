import React from 'react'
import { Link } from 'react-router-dom';

const SpecializedNavbar = () => {
  return (
    <div className="specializedNavbar">
      {/* <Link to="/wishlist" className="specItem">
        Wishlist
      </Link> */}
      <Link to="/featured" className="specItem">
        Featured
      </Link>
      <Link
        style={{ textDecoration: 'none', color: 'white' }}
        className="link"
        to="/products"
      >
        All Products
      </Link>
    </div>
  );
}

export default SpecializedNavbar