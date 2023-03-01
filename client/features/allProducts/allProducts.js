import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectProducts,
  fetchAllProductsAsync
} from '.../app/reducers/allProductsSlice';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import Product from './product';
// import SpecializedNavbar from //! import later

const AllProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, []);

  return (
    <div className="allProducts">
      <div>
        <Navbar />
        <div className="cartButton">
          <Link to={`/api/cart`}>Cart</Link>
        </div>
        {/* <SpecializedNavbar /> */} //! uncomment later
      </div>
      <div className="categoryFilters">
        <ul>
          <li onClick={() => setSelectedCategory('Nintendo')}>Nintendo</li>
          <li onClick={() => setSelectedCategory('Microsoft')}>Playstation</li>
          <li onClick={() => setSelectedCategory('Xbox')}>Xbox</li>
        </ul>
      </div>
      <div className="productCardParent">
        {selectedCategory
          ? products
              .filter((product) => product.categories.name === selectedCategory)
              .map((product, i) => <Product product={product} key={i} />)
          : products.map((product, i) => <Product product={product} key={i} />)}
      </div>
      <Footer />
    </div>
  );
};

export default AllProducts;
