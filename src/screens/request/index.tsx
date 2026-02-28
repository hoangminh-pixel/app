import { BasePage } from '@/components';
import { PRIMARY } from '@/utils/color';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import RequestListScreen from './repairRequest';

const Tab = createMaterialTopTabNavigator();

const RequestTopTabs = () => {
  return (
    <BasePage paddingHorizontal={0} title="Danh Sách Yêu Cầu">
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: false,
          tabBarActiveTintColor: PRIMARY,
          tabBarInactiveTintColor: 'gray',
          tabBarIndicatorStyle: {
            backgroundColor: PRIMARY,
          },
        }}
      >
        <Tab.Screen
          name={'ReportProblem'}
          component={RequestListScreen}
          options={{
            title: 'Báo sự cố',
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: '700',
            },
          }}
        />
        <Tab.Screen
          name={'RepairRequest'}
          component={RequestListScreen}
          options={{
            title: 'Yêu cầu sửa chữa',
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
export default RequestTopTabs;
