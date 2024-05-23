import { configureStore } from '@reduxjs/toolkit';
// import productReducer from '../store/productSlice';
import loginUserSlice from './loginUserSlice';
import infoRenderSlice from './infoRenderSlice';
import modalSlice from './modalSlice';

const store = configureStore({
	reducer: {
		// product: productReducer,
		auth: loginUserSlice,
		info: infoRenderSlice,
		modal: modalSlice,
	},
});

export default store;
