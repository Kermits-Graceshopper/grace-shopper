import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
  let cartProducts = [
    { id: 1, name: 'Elden Ring', price: 10.99, quantity: 2 },
    { id: 2, name: 'Dark Souls', price: 10.99, quantity: 2 },
    { id: 3, name: 'Diablo II', price: 10.99, quantity: 2 }
  ];

  const navigate = useNavigate();

  //   const dispatch = useDispatch();
  //   const cartProducts = useSelector(selectCartProducts); //! IMPORT FROM REDUX

  //   useEffect(() => {
  //     dispatch(fetchCartProductsAsync()); //! IMPORT FROM REDUX
  //   }, []);

  const handleCheckout = async () => {
    try {
      await axios
        .post(
          '/api/checkout',
          {
            cart: cartProducts
          },
          {
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.sessionUrl) {
            window.location.replace(response.data.sessionUrl); // Forwarding user to Stripe
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="changingBody">
      <div className='bodyContent'>
        <h1> Cart</h1>
        <div className="productContainer">
          <div>
            <div>
              <div>
                {cartProducts.length > 0
                  ? cartProducts.map((product) => {
                      return (
                        <div key={product.id}>
                      <h3>{product.name}</h3>
                      <p>Price: {product.price}</p>
                      <p>Quantity: {product.quantity}</p>
                      <button>Remove from Cart</button>
                    </div>
                      );
                    })
                  : 'There is nothing in your cart'}
                <div></div>
              </div>
            </div>
            <div>
              <div>
                <div className="cartTitle">
                  <h2>
                    Order Summary <br />
                    <div>{`Subtotal: (${cartProducts.length}items)`}</div>
                  </h2>
                  <hr />
                  <h2></h2>
                </div>
                <hr />
                <Button
                  className="coButton"
                  variant="primary"
                  size="lg"
                  onClick={handleCheckout}
                >
                  Proceed to checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
