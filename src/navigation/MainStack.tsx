// src/navigation/MainStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from './types';
import { HomeScreen } from '@/screens';
import BottomTabNavigator from './BottomTabNavigator';
import DetailMaintenanceScreen from '@/screens/works/detailMaintenance';
import AddMaterialScreen from '@/screens/supplies';
import DetailRepairScreen from '@/screens/works/detailRepair';
import CreateRepairRequestScreen from '@/screens/request/createRepairRequest';
import CreateReportProbemScreen from '@/screens/request/createReportProblem';
import DetailRequestScreen from '@/screens/request/detailRequest';
const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="DetailMaintenanceScreen"
        component={DetailMaintenanceScreen}
      />
      <Stack.Screen name="DetailRepairScreen" component={DetailRepairScreen} />
      <Stack.Screen name="SuppliesScreen" component={AddMaterialScreen} />
      <Stack.Screen
        name="CreateRepairRequestScreen"
        component={CreateRepairRequestScreen}
      />
      <Stack.Screen
        name="CreateReportProbemScreen"
        component={CreateReportProbemScreen}
      />
      <Stack.Screen
        name="DetailRequestScreen"
        component={DetailRequestScreen}
      />
    </Stack.Navigator>
  );
}
