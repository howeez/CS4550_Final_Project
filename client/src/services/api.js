import axios from 'axios';
import { logoutOn401 } from './logoutOn401.js';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  res => res,
  err => {
    if (err.response && err.response.status === 401) {
      logoutOn401();
    }
    return Promise.reject(err);
  }
);

export default API;
