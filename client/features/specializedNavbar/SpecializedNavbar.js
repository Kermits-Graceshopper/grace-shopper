import React from 'react'
import { Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';


const SpecializedNavbar = () => {
  return (
    <div className="specializedNavbar">
      <Link to="/wishlist" className="specItem">
        Wishlist
      </Link>
      <Link to="/featured" className="specItem">
        Featured
      </Link>
      <Link
        className="specItem"
        to="/products"
      >
        All Products
      </Link>
      <DropdownMenu />
    </div>
  );
}


export default SpecializedNavbar