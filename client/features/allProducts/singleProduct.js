

import React, { useState, useEffect} from 'react';
import EditProduct from './EditProduct';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';


const SingleProduct= () => {
  
  const { productId }  = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
console.log('productId: ', productId);

  
  const getProduct = async (id) => {
    await axios.get(`/api/products/${id}`)
    .then(res => {
      setName(res.data.name);
      setDescription(res.data.description);
      setPrice(res.data.price);
      setImageUrl(res.data.imageUrl);
      setCategory(res.data.category);
    })
  }
  
  useEffect(() => {
  getProduct(productId);
  }, [])
  // useEffect(() => {
  
  // }, [name, description, price, imageUrl, category])

  return (
    <div>
    <div>
    <EditProduct updateProduct={getProduct} name={name} description={description} price={price} imageUrl={imageUrl} category={category} />
    </div>
    <div className="productCard">
      <h1>{name}</h1>
      <img className="productImg" src={`${imageUrl}`} />
      <h3>Price: {price}</h3>
      <h5>{category}</h5>
      <p>{description}</p>
    </div>
    </div>
  );
};

export default SingleProduct;
