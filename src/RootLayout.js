import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import classNames from 'classnames/bind';
import styles from './components/Dashboard.module.scss';
import SideBar from './components/SideBar.js';
import { useDispatch, useSelector } from 'react-redux';
import DashBoard from './components/Dashboard.js';
import useAxios from './hook/useAxios.js';
import { infoAction } from './store/infoRenderSlice.js';
import { loginAction } from './store/loginUserSlice.js';
const cx = classNames.bind(styles);

const apiUrl = process.env.REACT_APP_API_URL;

const RootLayout = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	if (!user) {
		dispatch(
			loginAction.onLogin(JSON.parse(localStorage.getItem('user')) || [])
		);
	}
	const { loading, error, apiRequest } = useAxios();
	useEffect(() => {
		const fetchProducts = async () => {
			const res = await apiRequest(`${apiUrl}/api/products`, 'get');
			console.log(res);
			if (res) {
				dispatch(infoAction.products(res.products));
			}
		};
		const fetchOrder = async () => {
			const resOrder = await apiRequest(`${apiUrl}/api/get-orders`, 'get');

			console.log('res', resOrder);

			if (resOrder.status == 200) {
				dispatch(infoAction.order(resOrder.order));
			}
		};
		const fetchUser = async () => {
			const resUser = await apiRequest(`${apiUrl}/api/get-user-client`, 'get');
			if (resUser) {
				dispatch(infoAction.user(resUser.users));
			}
		};
		fetchProducts();
		fetchOrder();
		fetchUser();
	}, []);
	return (
		<div className={cx('container')}>
			<div className={cx('title')}>
				<div>
					<h2>Admin Page</h2>
				</div>
				<div className={cx('admin-name')}>
					<p>
						Chào mừng : <b>{user?.userName}</b>{' '}
					</p>
				</div>
			</div>
			<div className={cx('container-conten')}>
				<SideBar />
				<div className={cx('container-dashboard')}>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default RootLayout;
