import axios from 'axios';
import { API_URL } from '@/constants/url';

const api = axios.create({
	baseURL: API_URL
});

// TODO: код для авторизации с токеном:

// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     const authHeader = token ? `Bearer ${token}` : '';
//     const copyConfig = {...config};
//     if (copyConfig.headers) {
//         copyConfig.headers.Authorization = authHeader;
//     } else {
//         copyConfig.headers = {Authorization: authHeader};
//     }
//     return copyConfig;
// });

api.interceptors.response.use(
	(response) => response,
	(error) => Promise.reject(error)
);

export { api };
