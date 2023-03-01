import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
// import AuthForm from '../features/auth/AuthForm';
import Login from '../features/auth/Login';
import SignUp from '../features/auth/SignUp';
import Home from '../features/home/Home';
// import { me } from './store';
import CheckoutForm from '../features/checkout/CheckoutForm';
import ShoppingCart from '../features/shoppingCart/ShoppingCart';

/**
 * COMPONENT
 */

const AppRoutes = () => {
  // const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(me());
  // }, []);

  return (
    <div>
      {/* // isLoggedIn ?  */}
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route to="/home" element={<Home />} />
        </Routes>
        <Routes>
          {/* <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          /> */}
          <Route
            path="/api/login"
            element={<Login />}
          />
          <Route
            path="/api/signup"
            element={<SignUp />}
          />
          <Route
            path="/api/cart"
            element={<ShoppingCart />}
          />
         <Route
            path="/api/checkout"
            element={<CheckoutForm />}
          />
        </Routes>
    </div>
  );
};

export default AppRoutes;
