import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLogin: false,
	user: null,
};

const loginSlicce = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		onLogin(state, actions) {
			state.isLogin = true;
			state.user = actions.payload;
			const user = actions.payload;
			localStorage.setItem('user', JSON.stringify(user));
		},
		onLogout(state) {
			state.user = null;
			localStorage.removeItem('user');
			localStorage.removeItem('products');
			localStorage.removeItem('cartItems');
			localStorage.removeItem('checkedItems');
			localStorage.removeItem('order');
			localStorage.removeItem('selectedProducts');
		},
	},
});

export const loginAction = loginSlicce.actions;
export default loginSlicce.reducer;
