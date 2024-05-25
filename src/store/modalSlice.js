import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isModal: false,
	isOpenFormUpdate: false,
	idUpdate: null,
	isEdit: false,
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal(state) {
			state.isModal = true;
		},
		closeModal(state) {
			state.isModal = false;
		},
		openForm(state, actions) {
			state.isModal = true;
			state.isOpenFormUpdate = true;
			const idUpdate = actions.payload;
			if (idUpdate) {
				state.idUpdate = idUpdate;
			}
		},
		closeForm(state) {
			state.isModal = false;
			state.isOpenFormUpdate = false;
			state.idUpdate = null;
		},
		openFormEdit(state) {
			state.isEdit = true;
		},
		// closeForm(state) {
		// 	state.isEdit = false;
		// },
	},
});
export const modalAction = modalSlice.actions;

export default modalSlice.reducer;
