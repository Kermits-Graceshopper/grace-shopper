import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsersCartAsync = createAsyncThunk(
  'fetchCartAsync',
  async () => {
    try {
      const { data } = await axios.get(`/api/cart`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCartItemAsync = createAsyncThunk(
  'deleteCartItemAsync',
  async ({productId, userId}) => {
    try {
      const { data } = await axios.delete(`/api/cart/`, 
      {
        productId,
        userId
      });
      return data;
    } catch (error) {
      console.log(error);
    }
});

export const addToCartAsync = createAsyncThunk(
  'addToCartAsync',
  async ({userId, productId, quantity}) => {
    try {
      const { data } = await axios.post(`/api/cart`,
      {
        userId, 
        productId, 
        quantity
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);


const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCartAsGuest: (state, action) => {
      state.push(action.payload)
    },
    deleteCartItemAsGuest: (state, action) => {
      state = state.filter((product) => product.id !== action.payload)
  }
},
  extraReducers: (builder) => {
    builder.addCase(fetchUsersCartAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(deleteCartItemAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export const selectCart = (state) => {
  return state.cart;
};

export const { addToCartAsGuest, deleteCartItemAsGuest } = cartSlice.actions;
export default cartSlice.reducer;