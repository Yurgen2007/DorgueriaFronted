import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const axiosAPI = axios.create({
    baseURL : `${import.meta.env.VITE_API_CLIENT}`,
    headers : {
        'Content-Type' : 'application/json',    }
});

axiosAPI.interceptors.request.use((config) => {
    const token = cookies.get('token');
    config.headers.Authorization = `Bearer ${token}`
    return config;
    }, (error) => {
        console.log(error);
        return Promise.reject(error);
    }
)

export const axiosInstance = axiosAPI;
export default axiosAPI;
