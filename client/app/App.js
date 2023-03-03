import React from 'react';
import Footer from '../features/footer/Footer';

import Navbar from '../features/navbar/Navbar';
import SpecializedNavbar from '../features/specializedNavbar/SpecializedNavbar';
import AppRoutes from './AppRoutes';

const App = () => {
  return (
    <div className="mainArea">
      <Navbar />
      <SpecializedNavbar />
      <AppRoutes />
      <Footer />
    </div>
  );
};

export default App;
