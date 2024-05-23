import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import useAxios from '../hook/useAxios';
import { useDispatch } from 'react-redux';
import { loginAction } from '../store/loginUserSlice';

const cx = classNames.bind(styles);

const Login = () => {
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const [err, setErr] = useState('');
	const [postData, setPotData] = useState({
		email: '',
		password: '',
	});

	const { loading, error, apiRequest } = useAxios();
	// sử lý input data và validate
	const handlerSignIn = async () => {
		try {
			const res = await apiRequest(
				'https://server-web-tmdt-0d81a84104bb.herokuapp.com/api/login',
				'post',
				postData
			);
			console.log(res);
			if (res.status == false) {
				setErr(res.message);
			}
			if (res.status == true && res.user.role === 'user') {
				alert('tài khoản này không có quyền truy cập');
			}
			if (res.status == true && res.user.role == 'advisor') {
				dispatch(loginAction.onLogin(res.user));
				navigate('/adminChat');
			}
			if (res.status == true && res.user.role === 'admin') {
				dispatch(loginAction.onLogin(res.user));
				navigate('/dashboard');
			}
			localStorage.setItem('user', JSON.stringify(res.user));
		} catch (error) {
			console.log(error);
		}
	};
	const handleChange = async (e) => {
		e.preventDefault();
		setPotData({
			...postData,
			[e.target.name]: e.target.value,
		});
	};
	return (
		<>
			<div className={cx('container')}>
				<div className={cx('container-form')}>
					<h3>Sign In</h3>
					<div className={cx('form')}>
						<input
							onChange={handleChange}
							name='email'
							placeholder='Email'
							type='email'
						/>

						<input
							onChange={handleChange}
							name='password'
							placeholder='Password'
						/>

						{/* {error.passValue && (
							<p style={{ color: 'red' }}>{error.passValue}</p>
						)} */}
						<br />
						{err && <span className={cx('err')}>{err}</span>}
						<button className={cx('btn')} onClick={handlerSignIn}>
							Sign IN
						</button>
						<p>
							Create an account? <Link to='/register'>Click</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
