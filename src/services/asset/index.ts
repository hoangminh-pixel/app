import { axiosInstance, ASM_PREFIX } from '../api/axiosInstance';

interface AssetsPayload {
  access_token: string;
  company_id: number;
  business_unit_id: number;
  key_word: string;
  page: number;
  items_per_page: number;
  employee_id: number;
  department_id: number;
  zone_id: number;
  location_id: number;
  type_id: number;
}
export const getAssets = async (payload: AssetsPayload) => {
  const response = await axiosInstance.post(
    `${ASM_PREFIX}/get_assets`,
    payload,
  );

  return response.data.result;
};

interface AssetDetailPayload {
  access_token: string;
  company_id: number;
  business_unit_id: number;
  page: number;
  items_per_page: number;
  id: number;
}
export const getAssetDetail = async (payload: AssetDetailPayload) => {
  const response = await axiosInstance.post(`${ASM_PREFIX}/get_asset`, payload);

  return response.data.result;
};

interface AssetMarkDamagedPayload {
  access_token: string;
  asset_id: number;
}
export const getAssetMarkDamaged = async (payload: AssetMarkDamagedPayload) => {
  const response = await axiosInstance.post(
    `${ASM_PREFIX}/get_asset_mark_damaged`,
    payload,
  );

  return response.data.result;
};

interface AssetMarkLostPayload {
  access_token: string;
  asset_id: number;
}
export const getAssetMarkLost = async (payload: AssetMarkLostPayload) => {
  const response = await axiosInstance.post(
    `${ASM_PREFIX}/get_asset_mark_lost`,
    payload,
  );

  return response.data.result;
};

interface CreateAssetMarkDamagedPayload {
  access_token: string;
  asset_id: number;
  mark_damaged_date: string;
  description: string;
  lines: any[];
  business_unit_id: number;
}
export const createAssetMarkDamaged = async (
  payload: CreateAssetMarkDamagedPayload,
) => {
  const response = await axiosInstance.post(
    `${ASM_PREFIX}/create_asset_mark_damaged`,
    payload,
  );

  return response.data.result;
};

interface CreateAssetMarkLostPayload {
  access_token: string;
  asset_id: number;
  mark_lost_date: string;
  description: string;
  lines: any[];
  business_unit_id: number;
}
export const createAssetMarkLost = async (
  payload: CreateAssetMarkLostPayload,
) => {
  const response = await axiosInstance.post(
    `${ASM_PREFIX}/create_asset_mark_lost`,
    payload,
  );

  return response.data.result;
};

interface ReportHomePayload {
  access_token: string;
  company_id: number;
  business_unit_id: number;
}
export const getReportHome = async (payload: ReportHomePayload) => {
  const response = await axiosInstance.post(
    `${ASM_PREFIX}/get_report_by_state`,
    payload,
  );

  return response.data.result;
};

export const getGroupReport = async (payload: ReportHomePayload) => {
  const response = await axiosInstance.post(
    `${ASM_PREFIX}/get_report_by_type`,
    payload,
  );

  return response.data.result;
};

interface BusinessUnitPayload {
  access_token: string;
  key_word: string;
}
export const getBusinessUnit = async (payload: BusinessUnitPayload) => {
  const response = await axiosInstance.post(
    `${ASM_PREFIX}/get_business_unit`,
    payload,
  );

  return response.data.result;
};
