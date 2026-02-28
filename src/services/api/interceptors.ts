import { axiosInstance } from './axiosInstance';

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const setupInterceptors = () => {
  axiosInstance.interceptors.request.use(
    async config => {
      // if (accessToken) {
      //   config.headers.Authorization = `Bearer ${accessToken}`;
      // }

      console.log('REQUEST:', config.method, config.url, config.data);
      return config;
    },
    error => Promise.reject(error),
  );

  axiosInstance.interceptors.response.use(
    response => {
      console.log('RESPONSE:', response.data);
      return response;
    },
    async error => {
      if (error.response?.status === 401) {
        console.log('Unauthorized → TODO refresh token');
      }

      return Promise.reject(error);
    },
  );
};