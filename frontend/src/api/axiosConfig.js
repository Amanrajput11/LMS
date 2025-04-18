import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://lms-y02m.onrender.com/api', // Ensure this matches your backend URL
});

export default axiosInstance;
