import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useAxios from '../hook/useAxios';
import axios from 'axios';
import styles from './Modal.module.scss';
import classNames from 'classnames/bind';
import { modalAction } from '../store/modalSlice';
import { infoAction } from '../store/infoRenderSlice';

const cx = classNames.bind(styles);
const apiUrl = process.env.REACT_APP_API_URL;
const ModalContent = () => {
	const [imageUrl, setImageUrl] = useState('');
	const [postData, setPostData] = useState({
		name: '',
		category: '',
		short_desc: '',
		long_desc: '',
		image: null,
		price: '',
	});

	const { loading, error, apiRequest } = useAxios();
	const dispatch = useDispatch();

	const handleUpload = async (e) => {
		const files = e.target.files;
		console.log(files);
		const formData = new FormData();

		for (let i = 0; i < files.length; i++) {
			formData.append('images', files[i]);
		}

		try {
			const res = await axios.post(
				`${apiUrl}/api/upload-image`,
				formData,

				{
					headers: {
						'Content-Type': 'multipart/form-data', // Đặt header cho dữ liệu FormData
					},
				}
			);
			console.log(res);
			setImageUrl(res.data.filesPath);
		} catch (error) {
			console.error('Error uploading image:', error);
		}
	};
	console.log(imageUrl);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { name, category, short_desc, long_desc, price } = postData;
			const formDataForServer = {
				name,
				category,
				short_desc,
				long_desc,
				image: imageUrl,
				price,
			};
			const res = await apiRequest(
				`${apiUrl}/api/add-product`,
				'post',
				formDataForServer
			);
			console.log('Product added successfully:', res);

			if (res.status == 201) {
				dispatch(infoAction.addProduct(res.newProduct));
			}
			// Thực hiện các thao tác khác sau khi thêm sản phẩm thành công
			dispatch(modalAction.closeModal());
		} catch (error) {
			console.error('Error adding product:', error);
		}
	};

	const changeInput = (e) => {
		setPostData({ ...postData, [e.target.name]: e.target.value });
	};

	const onClose = () => {
		dispatch(modalAction.closeModal());
	};
	return (
		<>
			<div className={cx('title-button')}>
				<h4>Add New Product</h4>
				<button className={cx('modal-close-btn')} onClick={onClose}>
					Close
				</button>
			</div>

			<form onSubmit={handleSubmit}>
				<label>Product Name</label>
				<input
					type='text'
					placeholder=' Enter Product Name'
					name='name'
					onChange={changeInput}
				/>
				<label>Category</label>
				<input
					type='text'
					placeholder='Enter Category'
					name='category'
					onChange={changeInput}
				/>
				<label>Short Description</label>
				<input
					className={cx('short-description')}
					type='text'
					placeholder=' Enter Short Description '
					onChange={changeInput}
					name='short_desc'
				/>
				<label>Long Description</label>
				<input
					className={cx('long-description')}
					type='text'
					placeholder='Enter Long Description'
					onChange={changeInput}
					name='long_desc'
					id='long_desc'
				/>
				<label>Price</label>
				<input
					type='text'
					placeholder='Enter Price'
					onChange={changeInput}
					name='price'
				/>

				<label>Upload image (5 images)</label>
				<input
					type='file'
					name='image'
					onChange={(e) => handleUpload(e)}
					multiple
				/>
				<button type='submit' disabled={loading}>
					Submit
				</button>
			</form>
		</>
	);
};

export default ModalContent;
