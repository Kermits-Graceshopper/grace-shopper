import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Product = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name, price, id, imageUrl } = props.product;
  return (
    <div className="productCard">
      <h1>
        <Link to={`/api/products/${id}`}>Campus: {name}</Link>
        //! Link may be subject to change depending on route
      </h1>
      <img className="productImg" src={`${imageUrl}`}></img>
      <h3>Price: {price}</h3>
    </div>
  );
};

export default Product;
