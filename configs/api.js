import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:2222/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    response => response.data,
    error => {
        const message = error.response?.data?.message || 'API request failed';
        console.error('API request error:', error);
        return Promise.reject(new Error(message));
    }
);

export default axiosInstance;