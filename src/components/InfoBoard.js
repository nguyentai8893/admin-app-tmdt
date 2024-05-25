import React from 'react';
import classNames from 'classnames/bind';
import styles from './InfoBoard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faDollarSign,
	faFileCirclePlus,
	faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);
const InfoBoard = () => {
	const users = useSelector((state) => state.info.userState);
	const order = useSelector((state) => state.info.orderState);
	console.log('order', order);

	console.log(order);
	let totalPrice = 0;
	for (const orderProduct of order) {
		totalPrice += orderProduct.totalPrice;
	}
	return (
		<div className={cx('container')}>
			<div className={cx('container-info')}>
				<div className={cx('content')}>
					<div className={cx('content-info')}>
						<h3>{users?.length}</h3>
						<p> clients</p>
					</div>
					<div className={cx('content-icon')}>
						<FontAwesomeIcon className={cx('icon')} icon={faUserPlus} />
					</div>
				</div>
				<div className={cx('content')}>
					<div className={cx('content-info')}>
						<h3>
							{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND
						</h3>
						<p> Earnings of Month</p>
					</div>
					<div className={cx('content-icon')}>
						<FontAwesomeIcon className={cx('icon')} icon={faDollarSign} />
					</div>
				</div>
				<div className={cx('content')}>
					<div className={cx('content-info')}>
						<h3>{order?.length}</h3>
						<p> New Orders</p>
					</div>
					<div className={cx('content-icon')}>
						<FontAwesomeIcon className={cx('icon')} icon={faFileCirclePlus} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default InfoBoard;
