import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {selectProducts, fetchProductsAsync} from //!redux slice
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import Product from '../product/Product'

const AllProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const dispatch = useDispatch();
  const products = useSelector(selectProducts); //! import from redux slice

  useEffect(() => {
    dispatch(fetchProductsAsync()); //! import from redux slice
  }, []);

  return (
    <div className="allProducts">
      <Navbar />
      <div className='categoryFilters'>
        <ul>
          <li onClick={() => setSelectedCategory('Nintendo')}>Nintendo</li>
          <li onClick={() => setSelectedCategory('Playstation')}>Playstation</li>
          <li onClick={() => setSelectedCategory('Xbox')}>Xbox</li>
        </ul>
      </div>
      <div className="productCardParent">
        {products.filter(product => !selectedCategory || product.categories.category === selectedCategory).map((product, i) => (
        <Product product={product} key={i} />
    ))}
      </div>
      <Footer />
    </div>
  );
}

export default AllProducts;
