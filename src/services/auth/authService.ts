import { axiosInstance, CMMS_PREFIX } from '../api/axiosInstance';
import { ApiResponse } from '../api/types';

interface LoginPayload {
  login: string;
  password: string;
  // lang: string
}

export interface Root {
  access_token: string;
  company: Company;
  groups: string[];
  lang: string;
  login: string;
  message: string;
  name: string;
  role: string;
  password: string;

}

export interface Company {
  company: string;
  id: number;
  name: string;
}
interface LoginResponse {
  code: number;
  message: string;
  data: Root;
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await axiosInstance.post(`${CMMS_PREFIX}/login`, payload);

  return response.data.result?.[0];
};
