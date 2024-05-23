import React from 'react';
import Wraper from './Wraper';
import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import InfoBoard from './InfoBoard';
import History from './History';

const cx = classNames.bind(styles);

const DashBoard = () => {
	return (
		<>
			<h4 className={cx('h4-title')}>DashBoard</h4>
			<InfoBoard />
			<History />
		</>
	);
};

export default DashBoard;
