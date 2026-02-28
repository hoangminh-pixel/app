import { Root } from '@/services/auth/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  USER_INFO: 'user_info',
};

export interface StoredUser {
  id: number;
  name: string;
  email?: string;
}

export const setAccessToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  } catch (error) {
    console.error('Error saving access token:', error);
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};

export const removeAccessToken = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  } catch (error) {
    console.error('Error removing access token:', error);
  }
};

export const setUserInfo = async (user: Root) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user info:', error);
  }
};

export const getUserInfo = async (): Promise<Root | null> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_INFO);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting user info:', error);
    return null;
  }
};

export const removeUserInfo = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_INFO);
  } catch (error) {
    console.error('Error removing user info:', error);
  }
};

export const clearAuthStorage = async () => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.ACCESS_TOKEN,
      STORAGE_KEYS.USER_INFO,
    ]);
  } catch (error) {
    console.error('Error clearing auth storage:', error);
  }
};
