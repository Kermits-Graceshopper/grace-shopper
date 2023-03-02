import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';

const ShoppingCart = () => {
    let cartProducts = [
        { name: "Elden Ring" },
        {
            name: "Spiderman"
        }
    ]

//   const dispatch = useDispatch();
//   const cartProducts = useSelector(selectCartProducts); //! IMPORT FROM REDUX

//   useEffect(() => {
//     dispatch(fetchCartProductsAsync()); //! IMPORT FROM REDUX
//   }, []);
    
    
  return (
    <div className="cartDivParent">
      <div className="cartDiv">
        <div></div>
        {cartProducts.length > 0
          ? cartProducts.map((product) => {
              return <div>{product.name}</div>;
            })
          : 'There is nothing in your cart'}
        <div>
          <div className="checkoutButton d-grid gap-4">
            <Button variant="success" size="lg">
              Block level button
            </Button>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default ShoppingCart

