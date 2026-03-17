import { setCurrentModule } from '@/redux/slices/appSlice';
import { loginAsm } from '@/redux/slices/authSlice';
import { hideLoading, showLoading } from '@/redux/slices/loadingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { signInASM } from '@/services/auth/authService';
import {
  getUserInfoASM,
  setCurrentModuleStorage,
  setUserInfoASM,
} from '@/utils/storage';
import { showErrorToast } from '@/utils/toast';

const useSelectFunction = () => {
  const user = useAppSelector(state => state.auth.user);

  const dispatch = useAppDispatch();

  const selectModule = async (module: string) => {
    dispatch(setCurrentModule(module));
    await setCurrentModuleStorage(module);
  };

  const handleSignInAsm = async () => {
    try {
      dispatch(showLoading());

      const data = await signInASM({
        login: user?.login ?? '',
        password: user?.password ?? '',
        type: 'odoo',
        device_id: '123',
      });

      if (data && data.code === 401) {
        showErrorToast({
          content: data.message,
        });
        return;
      }
      if (data && data.code === 200) {
        const userInfor = data.data;
        await setUserInfoASM(userInfor);
      }

      const userInforAsm = await getUserInfoASM();
      if (userInforAsm) {
        console.log('userInforAsm', userInforAsm);

        dispatch(loginAsm({ user: userInforAsm }));
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
    selectModule,
    handleSignInAsm,
  };
};

export default useSelectFunction;
