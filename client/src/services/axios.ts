import axios from 'axios'



const axiosInstance = axios.create({
    //baseURL: environment.apiBaseUrl,
    baseURL: `http://localhost:5000`,
});


// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token',)
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
    (error) => {

        return Promise.reject(error);
    }
);

export default axiosInstance;
