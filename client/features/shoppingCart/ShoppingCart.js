import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ShoppingCart = () => {
  let cartProducts = [
    { key: 1, name: 'Elden Ring', price: 10.99 },
    {
      key: 2,
      name: 'Spiderman',
      price: 10.99,
    },
    {
      key: 3,
      name: 'that one cat game',
      price: 10.99,
    },
    {
      key: 4,
      name: 'elder scrolls',
      price: 10.99,
    },
    {
      key: 5,
      name: 'fallout',
      price: 10.99,
    },
    {
      key: 6,
      name: 'Spiderman2',
      price: 10.99,
    },
  ];

  //   const dispatch = useDispatch();
  //   const cartProducts = useSelector(selectCartProducts); //! IMPORT FROM REDUX

  //   useEffect(() => {
  //     dispatch(fetchCartProductsAsync()); //! IMPORT FROM REDUX
  //   }, []);

  const handleCheckout = () => {};

  return (
    <Container>
      <Row>
        <Col>
          <div className="cartDiv">
            {cartProducts.length > 0
              ? cartProducts.map((product) => {
                return (
                  <div key={product.key}>
                    <h3> {product.name}</h3>
                    <p> {product.price}</p>
                  </div>
                );
                })
              : 'There is nothing in your cart'}
            <div></div>
          </div>
        </Col>
        <Col>
          <div className="checkoutSidebar">
            <div className="cartTitle">
              <h2>
                Order Summary <br />
                <h4>{`Subtotal: (${cartProducts.length}items)`}</h4>
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
        </Col>
      </Row>
    </Container>
  );
};

export default ShoppingCart;
