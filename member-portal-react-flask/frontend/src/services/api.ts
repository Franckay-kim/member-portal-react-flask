import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', // Update to match your Flask backend
    withCredentials: true,
});

export default API;
