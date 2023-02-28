import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import {
  selectProduct,
  fetchSingleProductAsync
} from '.../app/reducers/singleProductsSlice';

const singleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const singleProduct = useSelector(selectProduct);

  useEffect(() => {
    dispatch(fetchSingleProductAsync(id));
  }, []);

  return (
    <div>
      <div className="singleProductPage">
        <img
          className="singleProductPageImg"
          src={`${singleProduct.imageUrl}`}
        ></img>
        <h1>Product Name: {singleProduct.name}</h1>
        <h3>Price: {singleProduct.price}</h3>
        <h3>Description: {singleProduct.description}</h3>
        <h3>Reviews: </h3>
        <ul>
          {singleProduct.reviews.length > 0
            ? singleProduct.reviews.map((review, i) => {
                <div className="reviewCard" key={i}>
                  <h3>{review}</h3>
                </div>;
              })
            : 'No reviews for this product'}
        </ul>
      </div>
    </div>
  );
};

export default singleProduct;
