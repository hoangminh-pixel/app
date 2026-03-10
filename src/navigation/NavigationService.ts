import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList, AuthStackParamList } from './types';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

type AppNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<MainStackParamList>,
  NativeStackNavigationProp<AuthStackParamList>
>;
export const useAppNavigation = () => useNavigation<AppNavigationProp>();
export const useAppRoute = <T extends keyof MainStackParamList>() =>
  useRoute<RouteProp<MainStackParamList, T>>();
