import { BasePage } from '@/components';
import { PRIMARY } from '@/utils/color';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import InventoryingScreen from './inventorying';
import InventoriedScreen from './inventoried';

const Tab = createMaterialTopTabNavigator();

const WorkTopTabs = () => {
  return (
    <BasePage paddingHorizontal={0} title="Kiểm kê">
      <Tab.Navigator
        screenOptions={{
          lazy: true,
          swipeEnabled: false,
          tabBarActiveTintColor: PRIMARY,
          tabBarInactiveTintColor: 'gray',
          tabBarIndicatorStyle: {
            backgroundColor: PRIMARY,
          },
        }}
      >
        <Tab.Screen
          name={'Inventorying'}
          component={InventoryingScreen}
          options={{
            title: 'Đang kiểm kê',
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: '700',
            },
          }}
        />
        <Tab.Screen
          name={'Inventoried'}
          component={InventoriedScreen}
          options={{
            title: 'Đã kiểm kê',
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: '700',
            },
          }}
        />
      </Tab.Navigator>
    </BasePage>
  );
};
export default WorkTopTabs;
