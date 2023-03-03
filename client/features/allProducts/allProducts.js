import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAllProducts, fetchAllProductsAsync } from '../../app/reducers/allProductsSlice';
import { selectSearchState } from '../../app/reducers/searchSlice';

const AllProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const products = useSelector(selectAllProducts);
  const [filtered, setFiltered] = useState(products);

  const dispatch = useDispatch();
  const search = useSelector(selectSearchState);

  useEffect(() => {
    if (selectedCategory === '') {
      setFiltered(products)
    } else {
      const filtered = products.filter((product) => product.platform === selectedCategory);
      console.log('directly after.filter()', 'filtered: ', filtered)
      setFiltered(filtered);
    }
  }, [selectedCategory])
  useEffect(() => {
    if (selectedCategory === '') {
      setFiltered(products)
    }
    dispatch(fetchAllProductsAsync());
  }, []);
  return (
    <div className="allProducts">
      <div>
        <div className="cartButton">
          <Link to={`/api/cart`}>Cart</Link>
        </div>
        <select defaultValue='' onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value=''>All</option>
          <option value='XBOX'>XBOX</option>
          <option value='PS5'>PS5</option>
          <option value='Nintendo'>Nintendo</option>
        </select>
      </div>
      <div className="categoryFilters">
        <ul>
          <li onClick={() => setSelectedCategory('Nintendo')}>Nintendo</li>
          <li onClick={() => setSelectedCategory('Microsoft')}>Playstation</li>
          <li onClick={() => setSelectedCategory('Xbox')}>Xbox</li>
        </ul>
      </div>
      <h1>Products:</h1>
      <div>
        {
          !filtered[0] && search[0] === '' ?
            products.map(product => (
              <div>
                <h1>{product.name}</h1>
                <img className='productImage' src={product.imageUrl} />
                <h3>{product.price}</h3>
                <h5>Category: {product.category}</h5>
                <p>{product.description}</p>
              </div>
            )) :
            filtered && products && search[0] === '' ?
              filtered.map(product => (
                <div>
                  <h1>{product.name}</h1>
                  <img className='productImage' src={product.imageUrl} />
                  <h3>{product.price}</h3>
                  <h5>Category: {product.category}</h5>
                  <p>{product.description}</p>
                </div>
              )) :
              products && search !== '' ? products.map(product => (
                product.name.includes(search[0]) ?
                  <div>
                    <h1>{product.name}</h1>
                    <img className='productImage' src={product.imageUrl} />
                    <h3>{product.price}</h3>
                    <h5>Category: {product.category}</h5>
                    <p>{product.description}</p>
                  </div>
                  : null
              ))
                : null
        }
      </div>
    </div>
  );
};

export default AllProducts;
