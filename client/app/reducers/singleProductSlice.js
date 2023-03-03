import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';

export const fetchSingleProductAsync = createAsyncThunk(
  'getSingleProduct',
  async (id) => {
    try {
      const { data } = await Axios.get(`/api/products/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = [];

const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export const selectProduct = (state) => {
  return state.singleProduct;
};

export default singleProductSlice.reducer;
