import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userState: [],
	orderState: [],
	productsState: [],
};

const infoSlice = createSlice({
	name: 'info',
	initialState,
	reducers: {
		user(state, actions) {
			state.userState = actions.payload;
		},
		updateUser(state, actions) {
			const updateUser = actions.payload;
			const index = state.userState.findIndex(
				(user) => user._id === updateUser._id
			);
			if (index !== -1) {
				state.userState[index] = updateUser;
			}
		},
		order(state, actions) {
			state.orderState = actions.payload;
		},
		products(state, actions) {
			state.productsState = actions.payload;
		},
		addProduct(state, actions) {
			state.productsState.push(actions.payload);
		},
		updateProduct(state, actions) {
			const updatedProduct = actions.payload;
			const index = state.productsState.findIndex(
				(product) => product._id === updatedProduct._id
			);
			if (index !== -1) {
				state.productsState[index] = updatedProduct;
			}
		},
		deleteProduct(state, actions) {
			state.productsState = state.productsState.filter(
				(f) => f._id !== actions.payload
			);
		},
	},
});

export const infoAction = infoSlice.actions;
export default infoSlice.reducer;
