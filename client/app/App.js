import React from 'react';
import CheckoutForm from '../features/checkout/CheckoutForm';
import Footer from '../features/footer/Footer';

import Navbar from '../features/navbar/Navbar';
import SpecializedNavbar from '../features/specializedNavbar/SpecializedNavbar';
import AppRoutes from './AppRoutes';

const App = () => {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Navbar />
        <SpecializedNavbar />
        <div className='changingBody'>
          <AppRoutes />
        </div>

        <br />
        <br />
        <br />
      </div>

      <Footer />
    </div>
  );
};

export default App;
