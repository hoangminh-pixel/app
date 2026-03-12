import { createFormData } from '@/utils/extension';
import { axiosInstance, CMMS_PREFIX } from '../api/axiosInstance';

interface Payload {
  login: string;
  password: string;
  page: number;
  item_per_page: number;
  maintenance_type: string[];
  filter_date?: string;
  check_today?: boolean;
  check_today_done?: boolean;
  stage?: [];
  check_due?: boolean;
  check_overday?: boolean;
  asset_category_level1_id?: any;
  filtered?: string;
  group?: string;
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
  const response = await axiosInstance.post(`${CMMS_PREFIX}/mro_order`, payload);

  return response.data.result?.[0];
};

interface PayloadDetailJob {
  login: string;
  password: string;
  mro_order_id: any;
}

export interface RootDetailJob {
  code: number;
  data: Data;
}

export interface Data {
  id: number;
  list_asset_select: ListAssetSelect;
  list_employee_approve: ListEmployeeApprove;
  list_transitions: ListTransitions;
  list_image_order: ListImageOrder;
  list_image_request: ListImageRequest;
  state_list: any[];
  state: State;
  name: Name;
  name_related: NameRelated;
  asset_id: AssetId;
  maintenance_type: MaintenanceType;
  priority_id: PriorityId;
  department_id: DepartmentId;
  execute_employee_id: ExecuteEmployeeId;
  assign_employee_ids: AssignEmployeeIds;
  mro_location_id: MroLocationId;
  parameter_description: ParameterDescription;
  date_planned: DatePlanned;
  date_scheduled: DateScheduled;
  date_execution: DateExecution;
  request_actual_date: RequestActualDate;
  actual_date: ActualDate;
  check_employee_id: CheckEmployeeId;
  guide: Guide;
  show_confirm_button: ShowConfirmButton;
  show_order_button: ShowOrderButton;
  g_map_location: GMapLocation;
  description: Description;
  reject_reason: RejectReason;
  list_project_task_ids: ListProjectTaskIds;
  list_line_ids: ListLineIds;
  list_order_parts_ids: ListOrderPartsIds;
  additional_parts: AdditionalParts;
  returned_parts: ReturnedParts;
  mro_rule_id: MroRuleId;
  task_id: TaskId;
  reasons_not_completing?: any;
}

export interface ListAssetSelect {
  list_asset_select: any[];
}

export interface ListEmployeeApprove {
  list_employee_approve: ListEmployeeApprove2[];
}

export interface ListEmployeeApprove2 {
  id: number;
  name: string;
  emp_code: string;
}

export interface ListTransitions {
  list_transitions: ListTransition[];
  field_name: string;
}

export interface ListTransition {
  action: string;
  display_name: string;
}

export interface State {
  state: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
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

export interface AssetId {
  id: number;
  name: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface MaintenanceType {
  maintenance_type: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface PriorityId {
  id: number;
  name: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface DepartmentId {
  id: number;
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

export interface MroLocationId {
  id: number;
  name: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface ParameterDescription {
  parameter_description: boolean | string;
  field_name: string;
}

export interface DatePlanned {
  date_planned: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface DateScheduled {
  date_scheduled: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface DateExecution {
  date_execution: string;
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

export interface ActualDate {
  actual_date: any;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface CheckEmployeeId {
  id: boolean;
  name: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface Guide {
  guide: boolean;
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

export interface GMapLocation {
  g_map_location: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface Description {
  description: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface RejectReason {
  reject_reason: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface ListProjectTaskIds {
  list_project_task_ids: any[];
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface ListLineIds {
  list_line_ids: any[];
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface ListOrderPartsIds {
  list_order_parts_ids: any[];
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface AdditionalParts {
  field_name: string;
  list_additional_parts: any[];
  required: boolean;
  readonly: boolean;
}

export interface ReturnedParts {
  field_name: string;
  list_returned_parts: any[];
  required: boolean;
  readonly: boolean;
}

export interface MroRuleId {
  id: number;
  name: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface TaskId {
  id: number;
  name: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export const getDetailJob = async (
  payload: PayloadDetailJob,
): Promise<RootDetailJob> => {
  const response = await axiosInstance.post(`${CMMS_PREFIX}/get_detail_mro_order`, payload);

  return response.data.result?.[0];
};

interface AssignWorkPayload {
  login: string;
  password: string;
  mro_order_id: any;
  employee_execute_id?: any;
  assign_employee_ids?: any;
  asset_id?: number;
  action: string;
  project_task_updates?: string;
  check_employee_id?: any;
  reasons_not_completing?: string;
  reason?: string;
}

export const assignWork = async (payload: AssignWorkPayload): Promise<any> => {
  const response = await axiosInstance.post(`${CMMS_PREFIX}/action_approve_order`, payload);

  return response.data.result?.[0];
};

interface DoneDetailJobPayload {
  login: string;
  password: string;
  mro_order_id: any;
  maintenance_type: string;
  description: string;
  g_map_location: string;
  reasons_not_completing?: string;
  imageFile?: any[];
}

export const doneDetailJob = async (
  payload: DoneDetailJobPayload,
): Promise<any> => {
  const response = await axiosInstance.post(
    `${CMMS_PREFIX}/add_update_mro_order_form`,
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
