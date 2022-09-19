import { Router, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios'



const axiosInstance = axios.create({
    //baseURL: environment.apiBaseUrl,
    baseURL: `https://ideapool-server.onrender.com`,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('idealpool_token',)
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            };
        }
        return config;
    },
    error => {
        Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            //signout
            // navigate('/user/login')

        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
