import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = [];

export const addToWishlistAsync = createAsyncThunk(
	"addToWishList",
	async ({ userId, quantity, productId }) => {
		try {
			const { data } = await axios.post("/api/wishList", {
				userId,
				quantity,
				productId
			});
			return data;
		} catch (e) {
			console.log("ERROR IN CATCH OF ADDTOWISHLISTASYNC THUNK: ", e);
		}
	}
);

export const removeFromWishlistAsync = createAsyncThunk(
	"removeFromWishlist",
	async ({ productId, userId }) => {
		const { data } = await axios.delete("/api/wishList", {
			productId,
			userId
		});
		return data;
	}
);

const wishlistSlice = createSlice({
	name: "wishlist",
	initialState,
	reducers: {
		addToWishlistAsGuest: (state, action) => {
			state.push(action.payload);
		},
		removeFromWishlistAsGuest: (state, action) => {
			state = state.filter((product) => product.id !== action.payload);
		},
		renewUsersWishlist: (state, action) => {
			state.push(action.payload);
		},
		clearWishlistOnLogout: (state, action) => {
			state = [];
		}
	},
	extraReducers: (builder) => {
		builder.addCase(addToWishlistAsync.fulfilled, (state, action) => {
			return action.payload;
		});
		builder.addCase(removeFromWishlistAsync.fulfilled, (state, action) => {
			return action.payload;
		});
	}
});

export const selectWishlist = (state) => state.wishlist;
export const {
	addToWishListAsGuest,
	removeFromWishlistAsGuest,
	renewUsersWishlist,
    clearWishlistOnLogout
} = wishlistSlice.actions;
export default wishlistSlice;
