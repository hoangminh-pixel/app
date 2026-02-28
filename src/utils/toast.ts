import Toast from 'react-native-toast-message';
import { Button } from 'react-native';

type Props = {
  title?: string;
  content?: string;
};

export const showErrorToast = (props: Props) => {
  Toast.show({
    type: 'error',
    text1: 'Opp!, Có lỗi xảy ra',
    text2: props.content,
  });
};

export const showSuccesToast = (props: Props) => {
  Toast.show({
    type: 'success',
    text1: props?.title,
    text2: props?.content,
  });
};
