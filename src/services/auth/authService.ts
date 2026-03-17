import { ASM_PREFIX, axiosInstance, CMMS_PREFIX } from '../api/axiosInstance';
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
  id: number
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

interface SignInAsmPayload {
  login: string;
  password: string;
  type: string;
  device_id: string;
}
export const signInASM = async (payload: SignInAsmPayload) => {
  const response = await axiosInstance.post(`${ASM_PREFIX}/sign_in`, payload);

  return response.data.result;
};

export interface RootAsmSignIn {
  access_token: string;
  business_unit_id: BusinessUnitId;
  company_id: CompanyId;
  partner_id: PartnerId;
  roles: Roles;
  user_id: UserId;
  user_type: string;
}

export interface BusinessUnitId {
  id: number;
  name: string;
}

export interface CompanyId {
  id: number;
  name: string;
}

export interface PartnerId {
  id: number;
  name: string;
}

export interface Roles {}

export interface UserId {
  email: string;
  id: number;
  img_url: string;
  name: string;
}
