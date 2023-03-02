import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';

const ShoppingCart = () => {
  let cartProducts = [
    { key: 1, name: 'Elden Ring' },
    {
      key: 2, name: 'Spiderman',
    },
  ];

  //   const dispatch = useDispatch();
  //   const cartProducts = useSelector(selectCartProducts); //! IMPORT FROM REDUX

  //   useEffect(() => {
  //     dispatch(fetchCartProductsAsync()); //! IMPORT FROM REDUX
  //   }, []);

  const handleCheckout = () => {};

  return (
    <div className="cartDivParent">
      <div className="cartDiv">
        {cartProducts.length > 0
          ? cartProducts.map((product) => {
              return <div key={product.key}>{product.name}</div>;
            })
          : 'There is nothing in your cart'}
        <div>

        </div>
      </div>
      <div className="checkoutDiv">
        <div className="cartTitle">
          <h2>Shopping Cart</h2>
          <h2>{`Subtotal: (${cartProducts.length}items)`}</h2>
        </div>
          <div className="checkoutButton d-grid gap-4">
            <Button variant="success" size="lg" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
