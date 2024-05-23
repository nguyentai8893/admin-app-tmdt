import React, { useState } from 'react';
import InfoBoard from './InfoBoard';
import styles from './Products.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { modalAction } from '../store/modalSlice';
import Modal from './Modal';
import useAxios from '../hook/useAxios';
import { infoAction } from '../store/infoRenderSlice';
const cx = classNames.bind(styles);

const Products = () => {
	const dispatch = useDispatch();
	const { apiRequest } = useAxios();
	const isOpenModal = useSelector((state) => state.modal.isModal);
	const isOpenFormUpdate = useSelector((state) => state.modal.isOpenFormUpdate);
	const idUpdate = useSelector((state) => state.modal.idUpdate);
	const handleOpenModal = (id) => {
		if (id) {
			dispatch(modalAction.openForm(id));
		}

		console.log('iddffffffffffff', id);
		dispatch(modalAction.openModal());
	};
	const products = useSelector((state) => state.info.productsState);
	const handleDelete = async (id) => {
		const shouldDelete = window.confirm(
			'Bạn có chắc chắn muốn xóa sản phẩm này?'
		);

		if (shouldDelete) {
			try {
				const res = await apiRequest(
					'http://localhost:8000/api/delete-product',
					'post',
					{ id }
				);
				console.log(res);

				if (res.status === 200) {
					dispatch(infoAction.deleteProduct(id));
				}
			} catch (error) {
				console.error('Đã xảy ra lỗi khi xóa sản phẩm:', error);
			}
		}
	};

	return (
		<>
			<div className={cx('container')}>
				<h4>Products</h4>
				<div className={cx('search-add')}>
					<div>
						<input placeholder='Enter Search !' name='search' />
					</div>
					<div>
						<button onClick={() => handleOpenModal()}>ADD NEW</button>
					</div>
				</div>

				<table className={cx('custom-table')}>
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>PRICE</th>
							<th>IMAGE</th>
							<th>CATEGORY</th>
							<th>EDIT</th>
						</tr>
					</thead>
					<tbody>
						{products?.map((item, index) => {
							return (
								<tr key={index}>
									<td>{item._id}</td>
									<td>{item.name}</td>
									<td>
										{item.price
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
									</td>
									<td>
										<img alt={item.name} src={item.img1} />
									</td>
									<td>{item.category}</td>
									<td>
										<button onClick={() => handleOpenModal(item._id)}>
											Update
										</button>
										<button onClick={() => handleDelete(item._id)}>
											Delelte
										</button>
									</td>

									{/* {isOpenFormUpdate ? <UpdateForm id={item._id} /> : null} */}
								</tr>
							);
						})}
					</tbody>
				</table>
				{isOpenModal ? (
					<Modal isOpen={isOpenModal} id={idUpdate ? idUpdate : null}></Modal>
				) : (
					''
				)}
			</div>
		</>
	);
};

export default Products;
