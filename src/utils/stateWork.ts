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
  }
  return state;
};
