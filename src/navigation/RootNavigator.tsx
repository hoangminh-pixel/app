// src/navigation/RootNavigator.tsx
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import BottomTabNavigator from './BottomTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '@/screens/splash';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { login, loginAsm } from '@/redux/slices/authSlice';
import {
  getCurrentModuleStorage,
  getUserInfo,
  getUserInfoASM,
} from '@/utils/storage';
import { setCurrentModule } from '@/redux/slices/appSlice';
import AppStack from './AppStack';

export default function RootNavigator() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(state => state.auth.isLogin);

  const handleCheckUser = async () => {
    try {
      const user = await getUserInfo();
      const userInforAsm = await getUserInfoASM();
      const module = await getCurrentModuleStorage();

      if (user) {
        dispatch(login({ user }));
      }
      if (userInforAsm) {
        dispatch(loginAsm({ user: userInforAsm }));
      }
      if (module) {
        dispatch(setCurrentModule(module));
      }
    } catch (error) {
      console.log('error : ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // setTimeout(() => {
    //   handleCheckUser();
    // }, 1500);
    handleCheckUser();
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {isLogin ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
