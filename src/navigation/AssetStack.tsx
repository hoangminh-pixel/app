import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AssetStackParamList } from './types';
import HomeAsmScreen from '@/asmScreens/home';
import ASMBottomTab from './ASMBottomTab';
import AssetDetailScreen from '@/asmScreens/assetDetail';
import MarkBrokenScreen from '@/asmScreens/markBroken';
import MarkLostScreen from '@/asmScreens/markLost';
import SettingScreen from '@/screens/setting';
import InventoryDetailScreen from '@/asmScreens/inventoryDetail';
import ScanQrInventoryScreen from '@/asmScreens/scanQrInventory';
import InventorySummaryScreen from '@/asmScreens/inventorySummary';
import InventoryResultScreen from '@/asmScreens/inventoryResult';
import InventoryResultDetailScreen from '@/asmScreens/inventoryResultDetail';

const Stack = createNativeStackNavigator<AssetStackParamList>();

export default function AssetStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BottomTab" component={ASMBottomTab} />
      <Stack.Screen name="Home" component={HomeAsmScreen} />
      <Stack.Screen name="AssetDetailScreen" component={AssetDetailScreen} />
      <Stack.Screen name="MarkBrokenScreen" component={MarkBrokenScreen} />
      <Stack.Screen name="MarkLostScreen" component={MarkLostScreen} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen
        name="InventoryDetailScreen"
        component={InventoryDetailScreen}
      />
      <Stack.Screen
        name="ScanQrInventoryScreen"
        component={ScanQrInventoryScreen}
      />
      <Stack.Screen
        name="InventorySummaryScreen"
        component={InventorySummaryScreen}
      />
      <Stack.Screen
        name="InventoryResultScreen"
        component={InventoryResultScreen}
      />
      <Stack.Screen
        name="InventoryResultDetailScreen"
        component={InventoryResultDetailScreen}
      />
    </Stack.Navigator>
  );
}
