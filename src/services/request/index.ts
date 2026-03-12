import { createFormData } from '@/utils/extension';
import { axiosInstance, CMMS_PREFIX } from '../api/axiosInstance';

interface ListMroRequestPayload {
  login: string;
  password: string;
  stage: [];
  filtered: string;
  maintenance_type: string[];
  group: string;
  page: number;
  item_per_page: number;
}
export const getListMroRequest = async (
  payload: ListMroRequestPayload,
): Promise<any> => {
  const response = await axiosInstance.post(`${CMMS_PREFIX}/mro_request`, payload);

  return response.data.result?.[0];
};

interface MroRequestPayload {
  login: string;
  password: string;
}
export const getInforDetailMroRequest = async (
  payload: MroRequestPayload,
): Promise<any> => {
  const response = await axiosInstance.post(
    `${CMMS_PREFIX}/create_detail_mro_request`,
    payload,
  );

  return response.data.result?.[0];
};

export const getListGroupAsset = async (
  payload: MroRequestPayload,
): Promise<any> => {
  const response = await axiosInstance.post(
    `${CMMS_PREFIX}/get_asset_category_level1`,
    payload,
  );

  return response.data.result?.[0];
};

export const getDepartment = async (
  payload: MroRequestPayload,
): Promise<any> => {
  const response = await axiosInstance.post(`${CMMS_PREFIX}/get_mro_department`, payload);

  return response.data.result?.[0];
};

export const getZone = async (payload: MroRequestPayload): Promise<any> => {
  const response = await axiosInstance.post(`${CMMS_PREFIX}/get_zone`, payload);

  return response.data.result?.[0];
};

export const getPriorityOption = async (
  payload: MroRequestPayload,
): Promise<any> => {
  const response = await axiosInstance.post(
    `${CMMS_PREFIX}/get_mro_priority_option`,
    payload,
  );

  return response.data.result?.[0];
};

export const getListAsset = async (
  payload: MroRequestPayload,
): Promise<any> => {
  const response = await axiosInstance.post(`${CMMS_PREFIX}/get_asset`, payload);

  return response.data.result?.[0];
};

interface ListServicePayload {
  login: string;
  password: string;
  asset_category_level2_id: any;
  zone_id: any;
  mro_location_id: any;
}
export const getListService = async (
  payload: ListServicePayload,
): Promise<any> => {
  const response = await axiosInstance.post(`${CMMS_PREFIX}/get_mro_request_cause`, payload);

  return response.data.result?.[0];
};

interface ListFunctionPayload {
  login: string;
  password: string;
  asset_category_level1_id: any;
}

export const getListFunction = async (
  payload: ListFunctionPayload,
): Promise<any> => {
  const response = await axiosInstance.post(
    `${CMMS_PREFIX}/get_asset_category_level2`,
    payload,
  );

  return response.data.result?.[0];
};

interface LocationPayload {
  login: string;
  password: string;
  zone_id: any;
}

export const getLocation = async (payload: LocationPayload): Promise<any> => {
  const response = await axiosInstance.post(`${CMMS_PREFIX}/get_location`, payload);

  return response.data.result?.[0];
};

interface CreateMroRequestPayload {
  login: string;
  password: string;
  maintenance_type: string;
  asset_id: any;
  asset_category_level1_id: any;
  cause_id?: any;
  zone_id: any;
  mro_location_id: any;
  description: string;
  note_employee_request: string;
  receive_department_id: any;
  request_department_id: any;
  priority_id: any;
  g_map_location?: string;
  report_cause_id?: any;
  action?: string;
  state?: string;
  request_actual_date?: string;
  reject_reason?: string;
  mro_request_id?: any;
  title?: string;

  imageFile?: any[];
}

export const createMroRequest = async (
  payload: CreateMroRequestPayload,
): Promise<any> => {
  const response = await axiosInstance.post(
    `${CMMS_PREFIX}/add_update_mro_request_form`,
    createFormData({ files: payload?.imageFile, body: payload }),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 90000,
    },
  );

  return response.data.result?.[0];
};
