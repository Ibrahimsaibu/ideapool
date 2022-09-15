import axios from 'axios'



const axiosInstance = axios.create({
    //baseURL: environment.apiBaseUrl,
    baseURL: `https://ideapool-server.onrender.com`,
});


// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('ideapool_token',)
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
