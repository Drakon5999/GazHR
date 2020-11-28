import axios from 'axios';
import config from '../../config';

const instance = axios.create({
  baseURL: config.baseURL,
  headers: {"Access-Control-Allow-Origin": "*"},
});

instance.interceptors.request.use(async (axiosConfig) => {
  return axiosConfig;
});

instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 429) {
      error = 'Очень много запросов, попробуй в другой время';
    } else if (error?.response?.status === 401) {
      error = error.response.data.message;
    } else if (
      error.toString().indexOf('Network Error') > -1 ||
      error.toString().indexOf('timeout of') > -1
    ) {
      error = 'Проблема при подключении, поробуй в другое время';
    }
    return Promise.reject(error);
  },
);

export default instance;
