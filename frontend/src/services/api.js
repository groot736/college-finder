import axios from 'axios';

const configuredBaseURL = (import.meta.env.VITE_API_URL || '').trim();
const baseURL = import.meta.env.DEV ? '/api' : (configuredBaseURL || '/api');

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;