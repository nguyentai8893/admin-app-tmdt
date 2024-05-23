import React from 'react';
import InfoBoard from './InfoBoard';
import classNames from 'classnames/bind';
import styles from './History.module.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
const History = () => {
	const order = useSelector((state) => state.info.orderState);
	return (
		<>
			<div className={cx('container')}>
				<h4>History</h4>
				<div className={cx('container-history')}>
					<table className={cx('custom-table')}>
						<thead>
							<tr>
								<th>ID User</th>
								<th>Name</th>
								<th>Phone</th>
								<th>Address</th>
								<th>Total</th>
								<th>Delivery</th>
								<th>Status</th>
								<th>Detail</th>
							</tr>
						</thead>
						<tbody>
							{order.map((order) => (
								<tr key={order.id}>
									<td>{order.customer.idUser}</td>
									<td>{order.customer.name}</td>
									<td>{order.customer.tel}</td>
									<td>{order.customer.address}</td>
									<td>
										{order.totalPrice
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
									</td>
									<td>chưa vận chuyển</td>
									<td>{order.status}</td>
									<td>
										<Link to={`/detail-order/${order._id}`}>
											<button>View</button>
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default History;
