import React from 'react';
import classNames from 'classnames/bind';
import styles from './DetailOrder.module.scss';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);
const DetailOrder = () => {
	const { id } = useParams();
	const dataOrder = useSelector((state) => state.info.orderState);
	const orderDetail = dataOrder.find((f) => f._id == id);
	return (
		<>
			<div className={cx('container')}>
				<h3>Detail Order :</h3>
				<p>
					<b>Name:</b> {orderDetail?.customer.name}
				</p>
				<p>
					<b>Tel:</b> {orderDetail?.customer.tel}
				</p>
				<p>
					<b>Email:</b> {orderDetail?.customer.email}
				</p>
				<p>
					<b>Address:</b> {orderDetail?.customer.address}
				</p>

				<table className={cx('custom-table')}>
					<thead>
						<tr>
							<th>Name</th>
							<th>PRICE</th>
							<th>IMAGE</th>
							<th>QUANTITY</th>
							<th>ID</th>
						</tr>
					</thead>

					<tbody>
						{orderDetail?.products?.map((item, index) => {
							return (
								<tr key={index}>
									<td>{item.name}</td>
									<td>
										{item.price
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
									</td>
									<td>{item.quantity}</td>
									<td>
										<img alt={item.name} src={item.image} />
									</td>

									<td>{item._id}</td>
								</tr>
							);
						})}
					</tbody>
				</table>

				<p>
					<b>Date Order:</b> {orderDetail?.orderDate}
				</p>
				<p>
					<b>Status:</b> {orderDetail?.status}
				</p>
				<p>
					<b>TotalPrice:</b>{' '}
					{orderDetail?.totalPrice
						.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
					VND
				</p>
			</div>
		</>
	);
};

export default DetailOrder;
