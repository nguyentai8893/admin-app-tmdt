import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { modalAction } from '../store/modalSlice';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import { useState } from 'react';
import useAxios from '../hook/useAxios';
import axios from 'axios';
import { infoAction } from '../store/infoRenderSlice';
import { storage } from '../config/firebaseConfig';
import { getDownloadURL, uploadBytes } from 'firebase/storage';

const cx = classNames.bind(styles);
const apiUrl = process.env.REACT_APP_API_URL;

const Modal = ({ isOpen, children, id }) => {
	const [imageUrl, setImageUrl] = useState('');
	const [imageUrls, setImageUrls] = useState([]);
	const [postData, setPostData] = useState({
		name: '',
		category: '',
		short_desc: '',
		long_desc: '',
		image: null,
		price: '',
		quantity: '',
	});
	const isOpenFormUpdate = useSelector((state) => state.modal.isOpenFormUpdate);
	const idUpdate = useSelector((state) => state.modal.idUpdate);
	const products = useSelector((state) => state.info.productsState);
	const product = products.filter((f) => f._id == id);
	const URL = id
		? `${apiUrl}/api/update-product/${id}`
		: `${apiUrl}/api/add-product`;
	const { loading, error, apiRequest } = useAxios();
	const dispatch = useDispatch();
	const handleUpload = async (e) => {
		const files = e.target.files;
		const urls = [];
		console.log('files', files);

		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const storageRef = ref(storage, `images/${file.name}`);
			await uploadBytes(storageRef, file);
			const url = await getDownloadURL(storageRef);
			console.log('urls', url);
			urls.push(url);
		}

		setImageUrls(urls);
	};
	console.log(imageUrls);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { name, category, short_desc, long_desc, price, quantity } =
				postData;
			const formDataForServer = {
				name,
				category,
				short_desc,
				long_desc,
				image: imageUrls,
				price,
				quantity,
			};
			const res = await apiRequest(URL, 'post', formDataForServer);
			console.log('Product added successfully:', res);

			if (res.status == 201) {
				dispatch(infoAction.addProduct(res.newProduct));
			}
			if (res.status == 200) {
				dispatch(modalAction.closeModal());
				dispatch(infoAction.updateProduct(res.updatedProduct));
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
		dispatch(modalAction.closeForm());
	};

	return isOpen
		? ReactDOM.createPortal(
				<div className={cx('modal-overlay')}>
					<div className={cx('modal-container')}>
						<div className={cx('title-button')}>
							{idUpdate ? <h4>Update Product</h4> : <h4>Add New Product</h4>}
							<button className={cx('modal-close-btn')} onClick={onClose}>
								Close
							</button>
						</div>

						<form onSubmit={handleSubmit}>
							<label>Product Name</label>
							<input
								type='text'
								placeholder={id ? product[0].name : 'Enter product name'}
								name='name'
								onChange={changeInput}
							/>
							<label>Category</label>
							<input
								type='text'
								placeholder={id ? product[0].category : 'Enter Category'}
								name='category'
								onChange={changeInput}
							/>
							<label>Short Description</label>
							<input
								className={cx('short-description')}
								type='text'
								placeholder={
									id ? product[0].short_desc : ' Enter Short Description '
								}
								onChange={changeInput}
								name='short_desc'
							/>
							<label>Long Description</label>
							<input
								className={cx('long-description')}
								type='text'
								placeholder={
									id ? product[0].long_desc : 'Enter Long Description'
								}
								onChange={changeInput}
								name='long_desc'
								id='long_desc'
							/>
							<label>Price</label>
							<input
								type='text'
								placeholder={id ? product[0].price : 'Enter Price'}
								onChange={changeInput}
								name='price'
							/>
							<label>Quantity</label>
							<input
								type='text'
								placeholder={id ? product[0].quantity : 'Enter quantity'}
								onChange={changeInput}
								name='quantity'
							/>

							<label>Upload image (5 images)</label>
							{id ? (
								<input type='file' name='image' multiple disabled />
							) : (
								<input
									type='file'
									name='image'
									onChange={(e) => handleUpload(e)}
									multiple
								/>
							)}

							<button type='submit' disabled={loading}>
								Submit
							</button>
						</form>
					</div>
				</div>,
				document.body
		  )
		: null;
};

export default Modal;
