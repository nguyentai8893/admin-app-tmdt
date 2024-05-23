import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import RootLayout from './RootLayout';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import History from './components/History';
import Products from './components/Products';
import store from './store';
import { Provider, useSelector } from 'react-redux';
import { useEffect } from 'react';
import useAxios from './hook/useAxios';
import DetailOrder from './components/DetailOrder';
import AdminChat from './components/AdminChat';
const authenticated = () => {
	const user = localStorage.getItem('user');
	if (user) {
		return true;
	}

	return false;
};
const router = createBrowserRouter([
	{
		path: '/',
		element: authenticated() ? <RootLayout /> : <Login />,
		children: [
			{
				path: '/dashboard',
				element: <Dashboard />,
			},
			{
				path: '/users',
				element: <Users />,
			},
			{
				path: '/history',
				element: <History />,
			},
			{
				path: '/products',
				element: <Products />,
			},
			{
				path: '/detail-order/:id',
				element: <DetailOrder />,
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
	},

	{
		path: '/register',
		element: <Register />,
	},
	{ path: '/adminChat', element: <AdminChat /> },
]);
function App() {
	return (
		<Provider store={store}>
			<RouterProvider router={router} />;
		</Provider>
	);
}

export default App;
