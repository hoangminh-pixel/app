import { Dimensions, Platform } from 'react-native';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export const isAndroid = Platform.OS === 'android';

export const ITEM_PER_PAGE = 50;

export const USER = 'group_mro_user';
export const TECH = 'group_mro_technician';
export const ADMIN = 'group_mro_manager';
