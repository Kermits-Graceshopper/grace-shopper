import React from 'react'
import { Link } from 'react-router-dom';

const SpecializedNavbar = () => {
  return (
      <div className='specializedNavbar'>
          <Link to="/wishlist" className='specItem'>
              Wishlist
          </Link>
          <Link to="/featured" className='specItem'>
              Featured
          </Link>
    </div>
  )
}

export default SpecializedNavbar