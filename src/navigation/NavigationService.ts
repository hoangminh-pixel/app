import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  MainStackParamList,
  AuthStackParamList,
  AssetStackParamList,
} from './types';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

type AppNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<MainStackParamList>,
  CompositeNavigationProp<
    NativeStackNavigationProp<AuthStackParamList>,
    NativeStackNavigationProp<AssetStackParamList>
  >
>;

type AppRouteParamList = MainStackParamList &
  AuthStackParamList &
  AssetStackParamList;

export const useAppNavigation = () => useNavigation<AppNavigationProp>();
export const useAppRoute = <T extends keyof AppRouteParamList>() =>
  useRoute<RouteProp<AppRouteParamList, T>>();
