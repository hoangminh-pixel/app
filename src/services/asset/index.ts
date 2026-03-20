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

interface InventoryPayload {
  access_token: string;
  company_id: number;
  business_unit_id: number;
  key_word: string;
  page: number;
  items_per_page: number;
  from_date: string;
  to_date: string;
  inventory_type: string | null;
}
export const getInventorying = async (payload: InventoryPayload) => {
  const response = await axiosInstance.post(
    `${ASM_PREFIX}/get_inventorying`,
    payload,
  );

  return response.data.result;
};

export const getInventoried = async (payload: InventoryPayload) => {
  const response = await axiosInstance.post(
    `${ASM_PREFIX}/get_inventoried`,
    payload,
  );

  return response.data.result;
};

interface InventoryDetailPayload {
  access_token: string;
  inventory_id: number;
}
export const getInventoryDetail = async (payload: InventoryDetailPayload) => {
  const response = await axiosInstance.post(
    `${ASM_PREFIX}/get_locations`,
    payload,
  );

  return response.data.result;
};

interface AssetsByLocationPayload {
  access_token: string;
  inventory_id: number;
  location_id: number;
  key_word: string;
}
export const getAssetsByLocation = async (payload: AssetsByLocationPayload) => {
  const response = await axiosInstance.post(
    `${ASM_PREFIX}/get_assets_by_location`,
    payload,
  );

  return response.data.result;
};

interface ScanQrCodeInfoPayload {
  access_token: string;
  inventory_id: number;
  location_id: number;
  asset_code: string;
}
export const getScanQrCodeInfo = async (payload: ScanQrCodeInfoPayload) => {
  const response = await axiosInstance.post(
    `${ASM_PREFIX}/get_asset_user_by_qrcode`,
    payload,
  );

  return response.data.result;
};

interface InventoryLinePayload {
  access_token: string;
  inventory_line_id: number;
}
export const getInventoryLine = async (payload: InventoryLinePayload) => {
  const response = await axiosInstance.post(
    `${ASM_PREFIX}/get_inventory_line`,
    payload,
  );

  return response.data.result;
};

interface UpdateInventoryLinePayload {
  access_token: string;
  inventory_line_id: number;
  quantity_unused: number;
  quantity_using: number;
  quantity_damaged: number;
  quantity_liquidation: number;
}
export const updateInventoryLine = async (
  payload: UpdateInventoryLinePayload,
) => {
  const response = await axiosInstance.post(
    `${ASM_PREFIX}/update_inventory_line`,
    payload,
  );

  return response.data.result;
};

interface DiffAssetsPayload {
  access_token: string;
  inventory_id: number;
  location_id: number;
  key_word: string;
  qty_asset: any[];
  asset_user: any[];
  location: any[];
  asset_type: any[];
  is_inventoried: boolean;
}
export const getDiffAssets = async (payload: DiffAssetsPayload) => {
  const response = await axiosInstance.post(
    `${ASM_PREFIX}/get_diff_asset`,
    payload,
  );

  return response.data.result;
};

interface InventoryResultPayload {
  access_token: string;
  inventory_id: number;
  location_id: number;
  type: number;
  is_inventoried: boolean;
}
export const getInventoryResult = async (payload: InventoryResultPayload) => {
  const response = await axiosInstance.post(
    `${ASM_PREFIX}/get_result_inventory`,
    payload,
  );

  return response.data.result;
};

interface DetailInventoryPayload {
  access_token: string;
  inventory_id: number;
  location_id: number;
  asset_id: number;
}
export const getDetailInventory = async (payload: DetailInventoryPayload) => {
  const response = await axiosInstance.post(
    `${ASM_PREFIX}/get_detail_inventory`,
    payload,
  );

  return response.data.result;
};

interface CompleteInventoryPayload {
  access_token: string;
  inventory_id: number;
}
export const completeInventory = async (payload: CompleteInventoryPayload) => {
  const response = await axiosInstance.post(
    `${ASM_PREFIX}/complete_inventory`,
    payload,
  );

  return response.data.result;
};
