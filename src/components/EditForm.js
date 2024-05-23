import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import classNames from 'classnames/bind';
import styles from './EditForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { modalAction } from '../store/modalSlice';
import useAxios from '../hook/useAxios';
import { infoAction } from '../store/infoRenderSlice';
const cx = classNames.bind(styles);

const EditForm = ({ id }) => {
	const { apiRequest } = useAxios();
	const dispatch = useDispatch();
	const users = useSelector((state) => state.info.userState);
	const user = users.filter((f) => f._id == id);
	const [formData, setFormData] = useState({
		id: '',
		name: '',
		email: '',
		phone: '',
		role: '',
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await apiRequest(
			`http://localhost:8000/api/edit-user/${id}`,
			'post',
			formData
		);
		if (res.status == 200) {
			dispatch(infoAction.updateUser(res.userEdit));
			dispatch(modalAction.closeForm());
		}
	};
	const handleCloseForm = () => {
		dispatch(modalAction.closeForm());
	};
	const handelChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};
	return ReactDOM.createPortal(
		<div className={cx('overlay')}>
			<div className={cx('update-form')}>
				<h2>Edit Form</h2>
				<form onSubmit={handleSubmit}>
					{/* Thêm các trường dữ liệu cần cập nhật */}
					<label>Id</label>
					<input disabled type='text' name='id' value={user[0]._id} />
					<label>UserName</label>
					<input type='text' name='name' value={user[0].userName} disabled />
					<label>Email</label>
					<input type='text' name='email' value={user[0].email} disabled />
					<label>Phone Number</label>
					<input
						type='text'
						name='phone'
						value={user[0].phoneNumber}
						disabled
					/>
					<label>Role</label>
					<input
						type='text'
						name='role'
						placeholder={user[0].role}
						onChange={handelChange}
					/>
					<button type='submit'>Save</button>
					<button onClick={() => handleCloseForm()}>Cancel</button>
				</form>
			</div>
		</div>,
		document.getElementById('portal-root')
	);
};
export default EditForm;
