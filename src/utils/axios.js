import axios from 'axios';
import { API_SERVER } from '../config/constant';
import { generateRedisKey } from './services';
const axiosServices = axios.create({
    baseURL:API_SERVER
});

// Add a request interceptor
axiosServices.interceptors.request.use(
    (config)=> {
    config.headers.Authorization =`Bearer ${localStorage.getItem('TOKEN')}`;
    config.headers.redis_key= generateRedisKey(config)
    return config;
});
axiosServices.interceptors.response.use(
    (response) => {
        if(response && response.data && response.data.data && response.data.data.message && response.data.data.message==="Invalid Token") {
            localStorage.clear()
            window.location.href = "/auth/signin";
            return 
        }
        return response;
    },
    (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;
