import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductsAsync, selectAllProducts } from '../../app/reducers/allProductsSlice';
import { selectSearchState } from '../../app/reducers/searchSlice';
import { selectUser } from '../../app/reducers/userSlice';
import axios from 'axios';

const AllProducts = () => {
  const [category, setCategory] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [updatedProducts, setUpdatedProducts] = useState([]);
  const dispatch = useDispatch()
  const products = useSelector(selectAllProducts);
  const search = useSelector(selectSearchState)[0];
  const currUser = useSelector(selectUser);
  console.log(currUser);
  const filter = () => {
    const filtered = products.filter(product => product.category === category);
    setFiltered(filtered);
  }
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
    filter();
  }, [updatedProducts, category]);
  return (
    <div>
      <h1>Products</h1>
      <select defaultValue='' onChange={(e) => setCategory(e.target.value)}>
        <option value=''>All</option>
        <option value='XBOX'>Xbox</option>
        <option value='Nintendo'>Nintendo</option>
        <option value='PS5'>PS5</option>
      </select>
      {
        filtered[0] && search !== '' || category !== '' ?
          filtered?.map(product => (
            product.name.toLowerCase().includes(search) || product.name.toUpperCase().includes(search) ?
              <div>
                {
                  currUser.isAdmin ?
                    <button type='submit' onClick={async (e) => {
                      e.preventDefault();
                      await axios.delete(`/api/products/${product.id}`)
                        .then(res => {
                          setUpdatedProducts(res.data);
                        });
                      console.log(updatedProducts)
                    }}>X</button> : null
                }

                <h1>{product.name}</h1>
                <img className='productImage' src={product.imageUrl} />
                <h3>{product.price}</h3>
                <h5>Category: {product.category}</h5>
                <p>{product.description}</p>
              </div> : null
          ))
          :
          !filtered[0] && search !== '' && category === '' ?
            products?.map(product => (
              product.name.toLowerCase().includes(search) || product.name.toUpperCase().includes(search)  ?
                <div>
                  {
                    currUser.isAdmin ?
                      <button type='submit' onClick={async (e) => {
                        e.preventDefault();
                        await axios.delete(`/api/products/${product.id}`)
                          .then(res => {
                            setUpdatedProducts(res.data);
                          });
                        console.log(updatedProducts)
                      }}>X</button> : null
                  }
                  <h1>{product.name}</h1>
                  <img className='productImage' src={product.imageUrl} />
                  <h3>{product.price}</h3>
                  <h5>Category: {product.category}</h5>
                  <p>{product.description}</p>
                </div> : null
            ))
            :
            filtered[0] && search === '' || category !== '' ?
              filtered?.map(product => (
                <div>
                  {
                    currUser.isAdmin ?
                      <button type='submit' onClick={async (e) => {
                        e.preventDefault();
                        await axios.delete(`/api/products/${product.id}`)
                          .then(res => {
                            setUpdatedProducts(res.data);
                          });
                        console.log(updatedProducts)
                      }}>X</button> : null
                  }
                  <h1>{product.name}</h1>
                  <img className='productImage' src={product.imageUrl} />
                  <h3>{product.price}</h3>
                  <h5>Category: {product.category}</h5>
                  <p>{product.description}</p>
                </div>
              ))
              :
              products.map(product => (
                <div>
                  {
                    currUser.isAdmin ?
                      <button type='submit' onClick={async (e) => {
                        e.preventDefault();
                        await axios.delete(`/api/products/${product.id}`)
                          .then(res => {
                            setUpdatedProducts(res.data);
                          });
                        console.log(updatedProducts)
                      }}>X</button> : null
                  }
                  <h1>{product.name}</h1>
                  <img className="productImage" src={product.imageUrl} />
                  <h3>{product.price}</h3>
                  <h5>Category: {product.category}</h5>
                  <p>{product.description}</p>
                </div>
                  ))
                }
                </div>

              )
}
                  

export default AllProducts                    