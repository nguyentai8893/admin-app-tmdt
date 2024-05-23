import { useState } from 'react';
import axios from 'axios';

const useAxios = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const apiRequest = async (url, method, data = null) => {
		setLoading(true);
		try {
			let response;
			if (method === 'get') {
				response = await axios.get(url, { withCredentials: true });
			} else if (method === 'post') {
				response = await axios.post(url, data, { withCredentials: true });
			} else if (method === 'put') {
				response = await axios.put(url, data, { withCredentials: true });
			} else if (method === 'delete') {
				response = await axios.delete(url, { withCredentials: true });
			}
			setLoading(false);
			return response.data;
		} catch (error) {
			setLoading(false);
			setError(error);
			throw error;
		}
	};

	return { loading, error, apiRequest };
};

export default useAxios;
