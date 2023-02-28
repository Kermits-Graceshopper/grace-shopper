import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import {selectProducts, fetchProductsAsync} from //!redux slice
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import Product from './product'

const AllProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const dispatch = useDispatch();
  const products = useSelector(selectProducts); //! import from redux slice

  useEffect(() => {
    dispatch(fetchProductsAsync()); //! import from redux slice
  }, []);

  return (
    <div className="allProducts">
      <div>
        <Navbar />
        <div className='cartButton'>
          <Link to={`/api/cart`}>Cart</Link>
        </div>
        <div className=''additionalLinks>
          <Link to={`/api/wishlist`}>Wishlist</Link>
          <Link to={`/api/featured`}>Featured</Link>
          {/* MAKE A FEATURED PAGE? CHECK TO MAKE SURE ROUTES ARE CORRECT */}
        </div>
      </div>
      <div className='categoryFilters'>
        <ul>
          <li onClick={() => setSelectedCategory('Nintendo')}>Nintendo</li>
          <li onClick={() => setSelectedCategory('Microsoft')}>Playstation</li>
          <li onClick={() => setSelectedCategory('Xbox')}>Xbox</li>
        </ul>
      </div>
      <div className="productCardParent">
        {selectedCategory? products.filter(product => product.categories.category === selectedCategory).map((product, i) => (
        <Product product={product} key={i} />
    )) : products.map((product, i) => (<Product product={product} key={i} />))}
      </div>
      <Footer />
    </div>
  );
}

export default AllProducts;
