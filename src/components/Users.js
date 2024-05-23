import React, { useState } from 'react';
import InfoBoard from './InfoBoard';
import classNames from 'classnames/bind';

import styles from './Products.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { modalAction } from '../store/modalSlice';
import EditForm from './EditForm';
const cx = classNames.bind(styles);
const Users = () => {
	const [idEdit, setIdEdit] = useState(null);
	const users = useSelector((state) => state.info.userState);
	const isEdit = useSelector((state) => state.modal.isEdit);
	const dispatch = useDispatch();
	console.log(users);
	const handleEdit = (id) => {
		setIdEdit(id);
		dispatch(modalAction.openFormEdit());
	};
	return (
		<>
			<div className={cx('container')}>
				<h4>user</h4>
				<div>
					<table className={cx('custom-table')}>
						<thead>
							<tr>
								<th>ID</th>
								<th>USER NAME</th>
								<th>EMAIL</th>
								<th>NUMBER PHONE</th>
								<th>ROLE</th>
								<th>EDIT</th>
							</tr>
						</thead>
						<tbody>
							{users.map((item, index) => {
								return (
									<tr key={index}>
										<td>{item._id}</td>
										<td>{item.userName}</td>
										<td>{item.email}</td>
										<td>{item.phoneNumber}</td>
										<td>{item.role}</td>
										<td>
											<button onClick={() => handleEdit(item._id)}>Edit</button>{' '}
											<FontAwesomeIcon icon={faUserPen} />
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					{isEdit ? <EditForm id={idEdit} /> : null}
				</div>
			</div>
		</>
	);
};

export default Users;
