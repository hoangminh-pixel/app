// src/navigation/RootNavigator.tsx
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import BottomTabNavigator from './BottomTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '@/screens/splash';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { login } from '@/redux/slices/authSlice';
import { getUserInfo } from '@/utils/storage';

export default function RootNavigator() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(state => state.auth.isLogin);

  const handleCheckUser = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const user = await getUserInfo();

      if (token) {
        setLoading(false);
        if (user) {
          dispatch(login({ user }));
        }
      }
    } catch (error) {
      console.log('error : ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handleCheckUser();
    }, 1500);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {isLogin ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
