import React from 'react'

const Wishlist = () => {
    let wishlist = [
        {
            name: 'product1', price: '$19.99'
        },
        {
            name: 'product2', price: '$69.99'
        },
        {
            name: 'product3', price: '$99.99'
        },
        {
            name: 'product4', price: '$32.99'
        },
        {
            name: 'product5', price: '$96.34'
        },
        {
            name: 'product6', price: '$26.99'
        }
    ]
  return (
      <div className='changingBody'>
          <h1> Wishlist</h1>
          <div className='productContainer'>
          {wishlist.length ? wishlist.map((item) => {
              return (
                
                  <div className="productCard product">
                    {item.name}
                    {item.price}
                  </div>
    
              );
          }): 'nope'}
          </div>
      </div>
  )
}

export default Wishlist