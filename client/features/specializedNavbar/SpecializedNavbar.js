import React from 'react'
import { Link } from 'react-router-dom';

const SpecializedNavbar = () => {
  return (
      <div className='specializedNavbar'>
          <Link className='specItem'>
              Wishlist
          </Link>
          <Link className='specItem'>
              Featured
          </Link>
    </div>
  )
}

export default SpecializedNavbar