import { Root, RootAsmSignIn } from '@/services/auth/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  USER_INFO: 'user_info',
  CURRENT_MODULE: 'CURRENT_MODULE',
  USER_INFO_ASM: 'USER_INFO_ASM',
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

export const setUserInfoASM = async (user: RootAsmSignIn) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.USER_INFO_ASM,
      JSON.stringify(user),
    );
  } catch (error) {
    console.error('Error saving setUserInfoASM:', error);
  }
};

export const getUserInfoASM = async (): Promise<RootAsmSignIn | null> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_INFO_ASM);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting getUserInfoASM:', error);
    return null;
  }
};

export const removeUserInfoASM = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_INFO_ASM);
  } catch (error) {
    console.error('Error removeUserInfoASM:', error);
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

export const setCurrentModuleStorage = async (module: string) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.CURRENT_MODULE,
      JSON.stringify(module),
    );
  } catch (error) {
    console.error('Error setCurrentModule:', error);
  }
};

export const getCurrentModuleStorage = async (): Promise<string | null> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_MODULE);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getCurrentModule:', error);
    return null;
  }
};

export const removeCurrentModuleStorage = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_MODULE);
  } catch (error) {
    console.error('Error removing removeCurrentModule:', error);
  }
};
