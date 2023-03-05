import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSingleProductAsync = createAsyncThunk(
  'getSingleProduct',
  async ({id}) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editSingleProductAsync = createAsyncThunk('editSingleProduct', async ({ name, description, price, imageUrl, category, productId}) => {
  try{
    const {data} = await axios.put(`/api/products/${productId}`, {
      name,
      description,
      price,
      imageUrl,
      category, 
      productId
    });
    return data;
   } catch(e){
    console.log('ERROR IN CATCH OF EDIT PRODUCT ASYNC THUNK');
  }
});

// async thunk for back button to all products 

const initialState = [];

const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(editSingleProductAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export const selectProduct = (state) => {
  return state.singleProduct;
};

export default singleProductSlice.reducer;
