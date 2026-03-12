import { axiosInstance, CMMS_PREFIX } from '../api/axiosInstance';

interface BusinessPayload {
  login: string;
  password: string;
}
export const getBusiness = async (payload: BusinessPayload): Promise<any> => {
  const response = await axiosInstance.post(`${CMMS_PREFIX}/get_business`, payload);

  return response.data.result?.[0];
};

interface DashboardSummaryPayload {
  login: string;
  password: string;
  business_unit_id: number;
  start_date: string;
  end_date: string;
}
export const getDashboardSummary = async (payload: DashboardSummaryPayload) => {
  const response = await axiosInstance.post(`${CMMS_PREFIX}/dashboard_summary`, payload);

  return response.data.result?.[0];
};

interface MaintenanceJobPayload {
  login: string;
  password: string;
  maintenance_type: string[];
  type: string[];
  date_from: string;
  date_to: string;
  check_draft: boolean;
  check_in_process: boolean;
  check_done: boolean;
}
export const getMaintenanceJob = async (payload: MaintenanceJobPayload) => {
  const response = await axiosInstance.post(`${CMMS_PREFIX}/statistic_report_order`, payload);

  return response.data.result?.[0];
};
