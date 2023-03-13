import axios from 'axios';

const token = localStorage.getItem('jwt');

export const instance = axios.create({});

instance.interceptors.request.use((config) => {
  config.headers.post.authorization = token;
  return config;
});
