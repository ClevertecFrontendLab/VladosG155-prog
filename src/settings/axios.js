import axios from 'axios';
import { instance } from './axios-instance';

// eslint-disable-next-line
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('jwt');

  // eslint-disable-next-line
  if (token) {
    // eslint-disable-next-line
    config.headers['Authorization'] = 'Bearer ' + token;
    return config;
  }
});

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
