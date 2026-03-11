import { hideLoading, showLoading } from '@/redux/slices/loadingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { login } from '@/services/auth/authService';
import { showErrorToast } from '@/utils/toast';
import { useState } from 'react';
import { Keyboard } from 'react-native';
import { login as loginAction } from '@/redux/slices/authSlice';
import { getUserInfo, setAccessToken, setUserInfo } from '@/utils/storage';

const useLogin = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);

  const handleLogin = async () => {
    if (!userName || !password) {
      showErrorToast({
        content: 'Vui lòng nhập đủ thông tin',
      });
      return;
    }
    dispatch(showLoading());
    Keyboard.dismiss();
    try {
      const data = await login({
        login: userName,
        password: password,
      });

      if (data.code === 401) {
        showErrorToast({
          content: data.message,
        });
        return;
      }
      const userInfor = {
        ...data.data,
        password: password,
      };

      await setUserInfo(userInfor);

      const user = await getUserInfo();
      if (user) {
        dispatch(loginAction({ user }));
      }
    } catch (error: any) {
      showErrorToast({
        content: error,
      });
      console.log(error);
    } finally {
      dispatch(hideLoading());
    }
  };

  return {
    userName,
    setUserName,
    password,
    setPassword,
    passwordVisible,
    setPasswordVisible,
    handleLogin,
  };
};

export default useLogin;
