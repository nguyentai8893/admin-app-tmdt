import React from 'react';
import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAction } from '../store/loginUserSlice';
import { useNavigate } from 'react-router-dom/dist';
const cx = classNames.bind(styles);
const SideBar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handlerLogout = () => {
		console.log('gdgfgfd');
		navigate('/login');
		dispatch(loginAction.onLogout());
	};
	return (
		<div className={cx('container')}>
			<div className={cx('content')}>
				<div>
					<h4>MAIN :</h4>
					<ul>
						<NavLink
							to={'/dashboard'}
							className={({ isActive }) =>
								isActive ? cx('active') : cx('inactive')
							}
						>
							<li>DashBoard :</li>
						</NavLink>
					</ul>
				</div>
				<div>
					<h4>LIST :</h4>
					<ul>
						<NavLink
							to={'/users'}
							className={({ isActive }) =>
								isActive ? cx('active') : cx('inactive')
							}
						>
							<li>USERS</li>
						</NavLink>
						<NavLink
							to={'/products'}
							className={({ isActive }) =>
								isActive ? cx('active') : cx('inactive')
							}
						>
							<li>PRODUCTS</li>
						</NavLink>
					</ul>
				</div>
				<div>
					<h4>SETTING</h4>
					<ul>
						<p>admin:</p>
						<li onClick={() => handlerLogout()}>
							<FontAwesomeIcon
								icon={faArrowRightFromBracket}
								className={cx('icon')}
							/>
							<span>Logout</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default SideBar;
