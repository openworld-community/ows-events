import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:7080/api',
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
    (error) => Promise.reject(error),
);

export {api};