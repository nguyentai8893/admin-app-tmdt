import React, { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';
import styles from './AdminChat.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../store/loginUserSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFaceSmile,
	faPaperPlane,
	faPaperclip,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import useAxios from '../hook/useAxios';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
const apiUrl = process.env.REACT_APP_API_URL;
const socket = io(apiUrl);

const AdminChat = () => {
	const navigate = useNavigate();
	const { apiRequest } = useAxios();
	const dispatch = useDispatch();
	const [rooms, setRooms] = useState([]); // State để lưu trữ danh sách các phòng chat
	const [roomId, setRoomId] = useState(null);
	const [selectedRoom, setSelectedRoom] = useState(); // State để lưu trữ phòng chat được chọn
	const [messages, setMessages] = useState([]); // State để lưu trữ các tin nhắn trong phòng chat
	const [message, setMessage] = useState(''); // State để lưu trữ tin nhắn hiện tại
	const user = useSelector((state) => state.auth.user);

	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser && !user) {
			dispatch(loginAction.onLogin(JSON.parse(storedUser)));
		}
	}, [user, dispatch]);

	useEffect(() => {
		socket.on('receiveMessage', ({ newMessage }) => {
			console.log('new', newMessage);
			setMessages((prevMessages) => [...prevMessages, newMessage]);
		});
		socket.on('roomCreated', (roomId) => {
			console.log('roomCreated', rooms);
			setRooms((prevRoom) => [...prevRoom, roomId]);
		});
		socket.on('roomEnded', (roomId) => {
			console.log('Phòng đã bị xóa:', roomId);
			setRooms((prevRooms) =>
				prevRooms.filter((room) => room.roomId !== roomId)
			);
			if (roomId === roomId) {
				setRoomId(null);
				setMessages([]);
			}
		});

		return () => {
			socket.off('receiveMessage');
			socket.off('roomCreated');
			socket.off('roomEnded');
		};
	}, [rooms]);
	console.log(rooms);

	const sendMessage = () => {
		if (!message.trim()) {
			return;
		}
		const newMessage = {
			sender: user.userName,
			content: message,
		};
		socket.emit('joinRoom', user._id);
		socket.emit('sendMessage', { roomId, newMessage });
		setMessage('');
	};

	const fetchRooms = async () => {
		try {
			const res = await apiRequest(`${apiUrl}/api/get-rooms`, 'get');
			if (res.rooms) {
				setRooms(res.rooms);
				// Chọn phòng đầu tiên mặc định
				if (res.rooms.length > 0) {
					const firstRoom = res.rooms[0].roomId;
					setRoomId(firstRoom);
					setSelectedRoom(firstRoom);
					socket.emit('joinRoom', firstRoom);
					fetchMessages(firstRoom);
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchRooms();
	}, []);

	const handleRoomClick = (selectedRoomId) => {
		console.log('selectedRoomId', selectedRoomId);
		setRoomId(selectedRoomId);
		setSelectedRoom(selectedRoomId);
		socket.emit('joinRoom', selectedRoomId);
		fetchMessages(selectedRoomId);
	};
	const fetchMessages = async (roomId) => {
		try {
			const res = await apiRequest(
				`${apiUrl}/api/get-messages?roomId=${roomId}`,
				'get'
			);
			if (res) {
				setMessages(res.messages);
			}
		} catch (error) {
			console.error(error);
		}
	};
	const handlekeyup = (e) => {
		if (e.key == 'Enter') {
			sendMessage();
		}
	};
	const handelLogout = () => {
		const confirmLogout = window.confirm(
			'Bạn có chắc chắn muốn đăng xuất không?'
		);
		if (confirmLogout) {
			dispatch(loginAction.onLogout());
			navigate('/login');
		}
	};
	return (
		<>
			<div className={cx('chat-container')}>
				<div className={cx('chat-title')}>
					<h3>Chat</h3>
					<p>apps/chat</p>
				</div>
				<div className={cx('container-content')}>
					<div className={cx('sidebar')}>
						<div className={cx('sidebar-content')}>
							<input type='text' placeholder='Search contact' />
							<h4>Active Rooms:</h4>
							<ul>
								{rooms.map((item, index) => (
									<li
										className={cx({
											'selecte-room': item.roomId === selectedRoom,
										})}
										key={index}
										onClick={() => handleRoomClick(item.roomId)}
									>
										<FontAwesomeIcon className={cx('icon')} icon={faUser} />
										{item.roomId}
									</li>
								))}
							</ul>
						</div>
						<div className={cx('btn')}>
							<button onClick={() => handelLogout()}>Logout</button>
						</div>
					</div>
					<div className={cx('chat-content')}>
						<div className={cx('chat-messages')}>
							{messages?.length &&
								messages.map((msg, index) => (
									<div
										key={index}
										className={cx('message', {
											'tvv-message': msg.sender === user.userName,
											'user-message': msg.sender !== user.userName,
										})}
									>
										<p
											className={cx(
												msg.sender === user.userName ? 'tvv' : 'user'
											)}
										>
											<img
												src={
													msg.sender === user.userName
														? '/assets/images/image.png'
														: '/assets/images/42394608_2179729705686535_2045392550251986944_n (1).jpg'
												}
												alt='Avatar'
											/>
											<strong>
												{msg.sender === user.userName ? 'You' : msg.sender}:
											</strong>
											{msg.content}
										</p>
									</div>
								))}
						</div>
						<div className={cx('input-button')}>
							<input
								type='text'
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								className={cx('message-input')}
								placeholder='Type and enter'
								onKeyDown={handlekeyup}
							/>
							<div className={cx('cont-icon')}>
								<FontAwesomeIcon className={cx('icons')} icon={faPaperclip} />
								<FontAwesomeIcon className={cx('icons')} icon={faFaceSmile} />
								<div className={cx('div-icon')}>
									<FontAwesomeIcon
										onClick={sendMessage}
										className={cx('icon')}
										icon={faPaperPlane}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default AdminChat;
