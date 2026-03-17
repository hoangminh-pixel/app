import {
  BLACK,
  BLUE,
  GRAY,
  GREEN,
  LIGHT_GREEN,
  LIGHT_RED,
  ORANGE,
  PRIMARY,
  PURPLE,
  RED,
  YELLOW,
} from './color';

export const getSateItem = ({ state }: { state: string }) => {
  if (state === 'draft') {
    state = 'Nháp';
  } else if (state === 'tp_gv') {
    state = 'QL giao việc';
  } else if (state === 'released') {
    state = 'Đang chờ các bộ phận';
  } else if (state === 'not_approve') {
    state = 'Not Approve';
  } else if (state === 'ready') {
    state = 'Sẵn sàng cho bảo trì';
  } else if (state === 'processing') {
    state = 'Đang thực hiện';
  } else if (state === 'wait_materials') {
    state = 'Chờ vật tư';
  } else if (state === 'wait_tp_acceptance') {
    state = 'Chờ QL nghiệm thu';
  } else if (state === 'done') {
    state = 'Hoàn thành';
  } else if (state === 'cancel') {
    state = 'Từ chối';
  } else if (state === 'give') {
    state = 'Nhận việc';
  } else if (state === 'waiting') {
    state = 'Chờ xác nhận';
  } else if (state === 'claim') {
    state = 'QL duyệt';
  } else if (state === 'run') {
    state = 'Đang thực hiện';
  } else if (state === 'cancel_order') {
    state = 'Từ chối';
  }
  return state;
};

export const getSateColor = ({ state }: { state: string }) => {
  let color = BLACK; // màu mặc định
  switch (state) {
    case 'draft':
      color = GRAY; // Nháp
      break;
    case 'tp_gv':
      color = BLUE; // TP giao việc
      break;
    case 'released':
      color = PURPLE; // Đang chờ các bộ phận
      break;
    case 'not_approve':
      color = GRAY; // Không duyệt (rỗng)
      break;
    case 'give':
      color = GRAY; // nhận việc
      break;
    case 'ready':
      color = LIGHT_GREEN; // Sẵn sàng cho bảo trì
      break;
    case 'processing':
      color = ORANGE; // Đang thực hiện
      break;
    case 'wait_materials':
      color = LIGHT_RED; // Chờ vật tư
      break;
    case 'cancel':
      color = RED; // Chờ vật tư
      break;
    case 'wait_tp_acceptance':
      color = YELLOW; // Chờ TP nghiệm thu
      break;
    case 'done':
      color = GREEN; // Hoàn thành
      break;
    case 'cancel':
      color = RED; // Từ chối
      break;
    case 'waiting':
      color = BLACK; // Từ chối
      break;
    case 'claim':
      color = PRIMARY; // Từ chối
      break;
    case 'run':
      color = BLUE; // Từ chối
      break;
    case 'cancel_order':
      color = RED; // Từ chối
      break;
    default:
      color = GRAY; // fallback
      break;
  }
  return color;
};
