import React from 'react'
import { Link } from 'react-router-dom';

const SpecializedNavbar = () => {
  return (
      <div className='specializedNavbar'>
          <Link to="/api/wishlist" className='specItem'>
              Wishlist
          </Link>
          <Link to="/api/featured" className='specItem'>
              Featured
          </Link>
    </div>
  )
}

export default SpecializedNavbar