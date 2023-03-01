import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';

export const fetchAllProductsAsync = createAsyncThunk(
  'getProducts',
  async () => {
    try {
      const { data } = await Axios.get(`/api/products`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = [];

const allProductsSlice = createSlice({
  name: 'allProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export const selectProducts = (state) => {
  return state.allProducts;
};

export default allProductsSlice.reducer;
