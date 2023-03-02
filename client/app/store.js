import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import allProductsReducer from './reducers/allProductsSlice';
import singleProductReducer from './reducers/singleProductSlice';
import currentUser from '../app/reducers/userSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    allProducts: allProductsReducer,
    singleProduct: singleProductReducer,
    user: currentUser,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;
export * from '../features/auth/authSlice';