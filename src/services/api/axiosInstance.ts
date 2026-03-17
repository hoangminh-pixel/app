import axios from 'axios';

export const API_URL = 'https://demo-cmms.izisolution.vn';


export const CMMS_PREFIX = '/icmms_webservice';

export const ASM_PREFIX = '/api/v1/erpviet_asm';


export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});
