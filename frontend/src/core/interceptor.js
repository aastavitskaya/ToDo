import axios from 'axios';
import Cookies from "universal-cookie";
import {TOKEN_REFRESH_URL} from "./consts";

const axiosInstance = axios.create();
const cookies = new Cookies()

const refreshAccessToken = () => {
  const refresh = cookies.get('refresh');
  const data = {refresh: refresh}

  return axios.post(TOKEN_REFRESH_URL, data);
};

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    const token = cookies.get('token')

    if (token && error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      return refreshAccessToken()
        .then((response) => {
          cookies.set('token', response.data.access);
          originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;

          return axios(originalRequest);
        })
        .catch((refreshError) => {
          return Promise.reject(refreshError);
        });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;