export interface RootRequest {
  id: number;
  list_transitions: ListTransitions;
  name: Name;
  list_image_request: ListImageRequest;
  description: Description;
  execution_date: ExecutionDate;
  asset_name: AssetName;
  state: State;
  cause: Cause;
  asset_category_name: AssetCategoryName;
  request_employee_id: RequestEmployeeId;
  receive_department_id: ReceiveDepartmentId;
  priority: Priority;
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

export interface ListImageRequest {
  list_image_request: ListImageRequest2[];
  field_name: string;
}

export interface ListImageRequest2 {
  name_image: string;
  image_url: string;
  name: string;
  value: string;
}

export interface Description {
  description: string;
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

export interface Cause {
  cause: string;
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

export interface RequestEmployeeId {
  request_employee_id: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface ReceiveDepartmentId {
  receive_department_id: string;
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

export interface DetailRequestResponse {
  id: number;
  list_employee_approve: ListEmployeeApprove;
  list_transitions: ListTransitions;
  name: Name;
  title: Title;
  note_employee_request: NoteEmployeeRequest;
  zone_id: ZoneId;
  maintenance_type: MaintenanceType;
  asset_id: AssetId;
  asset_category_level1_id: AssetCategoryLevel1Id;
  asset_category_level2_id: AssetCategoryLevel2Id;
  requested_date: RequestedDate;
  execution_date: ExecutionDate;
  request_actual_date: RequestActualDate;
  cause_id: CauseId;
  evaluate: Evaluate;
  note_evaluate: NoteEvaluate;
  reject_reason: RejectReason;
  priority_id: PriorityId;
  request_department_id: RequestDepartmentId;
  request_employee_id: RequestEmployeeId;
  receive_department_id: ReceiveDepartmentId;
  check_employee_id: CheckEmployeeId;
  mro_location_id: MroLocationId;
  g_map_location: GMapLocation;
  describe: Describe;
  list_rework_logs: ListReworkLogs;
  list_image_request: ListImageRequest;
  email_cc: EmailCc;
  state: State;
  show_button: ShowButton;
}

export interface ListEmployeeApprove {
  list_employee_approve: ListEmployeeApprove2[];
}

export interface ListEmployeeApprove2 {
  id: number;
  name: string;
  emp_code: any;
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

export interface Title {
  title: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface NoteEmployeeRequest {
  note_employee_request: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface ZoneId {
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

export interface AssetId {
  id: number;
  name: string;
  field_name: string;
}

export interface AssetCategoryLevel1Id {
  id: number;
  name: string;
  field_name: string;
}

export interface AssetCategoryLevel2Id {
  id: number;
  name: string;
  field_name: string;
}

export interface RequestedDate {
  requested_date: string;
  field_name: string;
  required: boolean;
}

export interface ExecutionDate {
  execution_date: string;
  field_name: string;
  required: boolean;
}

export interface RequestActualDate {
  request_actual_date: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface CauseId {
  id: number;
  name: string;
  field_name: string;
  required: boolean;
}

export interface Evaluate {
  evaluate: string;
  field_name: string;
  required: boolean;
}

export interface NoteEvaluate {
  note_evaluate: string;
  field_name: string;
  required: boolean;
}

export interface RejectReason {
  reject_reason: string;
  field_name: string;
  required: boolean;
}

export interface PriorityId {
  id: number;
  name: string;
  field_name: string;
  required: boolean;
}

export interface RequestDepartmentId {
  id: boolean;
  name: string;
  field_name: string;
  required: boolean;
}

export interface RequestEmployeeId {
  id: number;
  name: string;
  field_name: string;
  required: boolean;
}

export interface ReceiveDepartmentId {
  id: number;
  name: string;
  field_name: string;
  required: boolean;
}

export interface CheckEmployeeId {
  id: number;
  name: string;
  receive_department_id: ReceiveDepartmentId2;
  field_name: string;
  required: boolean;
}

export interface ReceiveDepartmentId2 {
  id: number;
  name: string;
}

export interface MroLocationId {
  id: number;
  name: string;
  field_name: string;
  required: boolean;
}

export interface GMapLocation {
  g_map_location: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface Describe {
  describe: string;
  field_name: string;
  required: boolean;
}

export interface ListReworkLogs {
  list_rework_logs: any[];
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface EmailCc {
  email_cc: any[];
  field_name: string;
  required: boolean;
}

export interface State {
  state: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface ShowButton {
  show_button: boolean;
  field_name: string;
  required: boolean;
  list_transitions: ListTransitions2;
}

export interface ListTransitions2 {
  list_transitions: ListTransition2[];
  field_name: string;
}

export interface ListTransition2 {
  action: string;
  display_name: string;
}
