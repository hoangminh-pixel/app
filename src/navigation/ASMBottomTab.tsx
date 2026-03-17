import AssetScreen from '@/asmScreens/asset';
import HomeScreen from '@/asmScreens/home';
import InventoryScreen from '@/asmScreens/inventory';
import ReportScreen from '@/asmScreens/report';

import MaterialIcons from '@react-native-vector-icons/material-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

export type MainTabParamList = {
  Asset: undefined;
  Inventory: undefined;
  Home: undefined;
  Report: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const ASMBottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#005a3c',
        tabBarInactiveTintColor: '#999',

        tabBarIcon: ({ color }) => {
          switch (route.name) {
            case 'Asset':
              return (
                <MaterialIcons name="inventory-2" size={26} color={color} />
              );

            case 'Inventory':
              return <MaterialIcons name="warehouse" size={26} color={color} />;

            case 'Home':
              return <MaterialIcons name="home" size={26} color={color} />;

            case 'Report':
              return <MaterialIcons name="bar-chart" size={26} color={color} />;

            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen
        name="Asset"
        component={AssetScreen}
        options={{ tabBarLabel: 'Tài sản' }}
      />

      <Tab.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{ tabBarLabel: 'Kho' }}
      />

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Trang chủ' }}
      />

      <Tab.Screen
        name="Report"
        component={ReportScreen}
        options={{ tabBarLabel: 'Báo cáo' }}
      />
    </Tab.Navigator>
  );
};

export default ASMBottomTab;
