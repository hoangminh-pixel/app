import { axiosInstance } from '../api/axiosInstance';

interface Payload {
  login: string;
  password: string;
  page: number;
  item_per_page: number;
  maintenance_type: string[];
  filter_date?: string;
  check_today?: string;
  check_today_done?: string;
  stage: [];
  check_due?: string;
  check_overday?: string;
  asset_category_level1_id?: string;
  filtered: string;
  group: string;
}

export interface ResponseWorkRepair {
  code: number;
  data: Data;
}

export interface Data {
  list_filters: ListFilter[];
  list_groups: ListGroup[];
  list_requests: ListRequest[];
}

export interface ListFilter {
  key: string;
  value: string;
  active: boolean;
  priority: number;
}

export interface ListGroup {
  key: string;
  value: string;
  active: boolean;
  order_group: string;
  priority: number;
}

export interface ListRequest {
  master: string;
  value: number;
  detail?: Detail[];
}

export interface Detail {
  id: number;
  maintenance_type: MaintenanceType;
  list_transitions: ListTransitions;
  name: Name;
  name_related: NameRelated;
  mro_location_id: MroLocationId;
  show_confirm_button: ShowConfirmButton;
  show_order_button: ShowOrderButton;
  list_image_request: ListImageRequest;
  list_image_order: ListImageOrder;
  description: Description;
  task_name: TaskName;
  execution_date: ExecutionDate;
  request_actual_date: RequestActualDate;
  asset_name: AssetName;
  state: State;
  priority: Priority;
  asset_category_name: AssetCategoryName;
  execute_employee_id: ExecuteEmployeeId;
  assign_employee_ids: AssignEmployeeIds;
}

export interface MaintenanceType {
  name: string;
  field_name: string;
}

export interface ListTransitions {
  list_transitions: ListTransition[];
  field_name: string;
}

export interface ListTransition {
  action: string;
  display_name: string;
}

export interface Name {
  name: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface NameRelated {
  name_related: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface MroLocationId {
  id: number;
  name: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface ShowConfirmButton {
  show_confirm_button: boolean;
  field_name: string;
  required: boolean;
}

export interface ShowOrderButton {
  show_order_button: boolean;
  field_name: string;
  required: boolean;
}

export interface ListImageRequest {
  list_image_request: ListImageRequest2[];
  field_name: string;
}

export interface ListImageRequest2 {
  name_image: string;
  image_url: string;
}

export interface ListImageOrder {
  list_image_order: ListImageOrder2[];
  field_name: string;
}

export interface ListImageOrder2 {
  name_image: string;
  image_url: string;
}

export interface Description {
  description: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface TaskName {
  task_name: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface ExecutionDate {
  execution_date: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface RequestActualDate {
  request_actual_date: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface AssetName {
  asset_name: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface State {
  state: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface Priority {
  id: number;
  priority: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface AssetCategoryName {
  asset_category_name: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface ExecuteEmployeeId {
  id: any;
  name: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface AssignEmployeeIds {
  assign_employee_ids: any[];
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export const getListJob = async (
  payload: Payload,
): Promise<ResponseWorkRepair> => {
  const response = await axiosInstance.post('/mro_order', payload);

  return response.data.result?.[0];
};
