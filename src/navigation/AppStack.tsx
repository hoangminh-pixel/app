import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAppSelector } from '@/redux/store/hooks';
import SelectFunctionScreen from '@/screens/selectFuction';
import MainStack from './MainStack';
import AssetStack from './AssetStack';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  const module = useAppSelector(state => state.app.currentModule);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!module ? (
        <Stack.Screen name="SelectFunction" component={SelectFunctionScreen} />
      ) : module === 'maintenance' ? (
        <Stack.Screen name="MaintenanceStack" component={MainStack} />
      ) : (
        <Stack.Screen name="AssetStack" component={AssetStack} />
      )}
    </Stack.Navigator>
  );
}
