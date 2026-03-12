import { axiosInstance, CMMS_PREFIX } from '../api/axiosInstance';

interface CountTotalWorkPayload {
  login: string;
  password: string;
}

export const countTotalWork = async (
  payload: CountTotalWorkPayload,
): Promise<any> => {
  const response = await axiosInstance.post(
    `${CMMS_PREFIX}/count_total_work`,
    payload,
  );

  return response.data.result?.[0];
};
