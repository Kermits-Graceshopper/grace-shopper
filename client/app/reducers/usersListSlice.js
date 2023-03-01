import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// create async thunk that makes axios get request to retrieve all users
// protected route - admin only

export const getAllUsersAsync = createAsyncThunk('get/allUsers', async () => {
    try {
        const response = await axios.get('/users/allusers');
        return response.data;
    } catch(e){
        console.log()
    }
});

const initialState = [];

const usersListSlice = createSlice({
    name: 'usersList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllUsersAsync.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})


export const selectAllUsers = state => state.usersList;
export default usersListSlice.reducer;
