import axios from 'axios';

export const API_URL = 'https://demo-cmms.izisolution.vn/icmms_webservice'; 

// export const API_URL = 'https://qlts.dragondoson.vn/icmms_webservice'; 

// export const API_URL = 'http://localhost:8069/icmms_webservice';

export const axiosInstance = axios.create({
  baseURL: API_URL, 
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});