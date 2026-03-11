import { createFormData } from '@/utils/extension';
import { axiosInstance } from '../api/axiosInstance';

interface ActionUpdateChecklistPayload {
  login: string;
  password: string;
  mro_check: string;
  task_id: number | string;
  description: string;
  g_map_location: string;
  measure: number | string;
  project_task_updates?: string;
  check_employee_id?: any;
  reasons_not_completing?: string;
  imageFile?: any[];
}

export const actionUpdateChecklist = async (
  payload: ActionUpdateChecklistPayload,
): Promise<any> => {
  const response = await axiosInstance.post(
    '/action_update_checklist_form',
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

interface ListSuppliesPayload {
  login: string;
  password: string;
  search: string;
}

export const getListSuppliesData = async (
  payload: ListSuppliesPayload,
): Promise<any> => {
  const response = await axiosInstance.post('/get_product', payload);

  return response.data.result?.[0];
};

interface ListSuppliesAddedPayload {
  login: string;
  password: string;
  mro_order_id: number;
}
export const getListSuppliesAdded = async (
  payload: ListSuppliesAddedPayload,
): Promise<any> => {
  const response = await axiosInstance.post(
    '/create_detail_returned_part',
    payload,
  );

  return response.data.result?.[0];
};

export const getInfoAddSupplies = async (
  payload: ListSuppliesAddedPayload,
): Promise<any> => {
  const response = await axiosInstance.post(
    '/create_detail_additional_parts',
    payload,
  );

  return response.data.result?.[0];
};

interface AddSuppliesPayload {
  login: string;
  password: string;
  mro_order_id: number;
  manager_id: string;
  line_ids: any[];
}

export const addSuppliesService = async (
  payload: AddSuppliesPayload,
): Promise<any> => {
  const response = await axiosInstance.post(
    '/additional_parts_action_done',
    payload,
  );

  return response.data.result?.[0];
};

interface DetailRequestPayload {
  login: string;
  password: string;
  mro_request_id: number;
}

export const getDetailRequest = async (
  payload: DetailRequestPayload,
): Promise<any> => {
  const response = await axiosInstance.post('/get_detail_mro_request', payload);

  return response.data.result?.[0];
};

interface ListDevicesPayload {
  login: string;
  password: string;
}
export const getListDevices = async (
  payload: ListDevicesPayload,
): Promise<any> => {
  const response = await axiosInstance.post(
    '/get_asset_category_level1',
    payload,
  );

  return response.data.result?.[0];
};
