import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            const { fullName, firstName, lastName, email, accessToken, role, isLoggedIn} = action.payload
            state.fullName = fullName;
            state.firstName = firstName;
            state.lastName = lastName;
            state.email = email;
            state.accessToken = accessToken;
            state.role = role;
            state.isLoggedIn = isLoggedIn;
        }
    }
});

export const selectUserRole = state => state.user.role;
export const selectUser = state => state.user;
export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;