import { BasePage } from '@/components';
import { PRIMARY } from '@/utils/color';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import MaintanenceScreen from './maintenance';
import RepairScreen from './repair';

const Tab = createMaterialTopTabNavigator();

const WorkTopTabs = () => {
  return (
    <BasePage paddingHorizontal={0} title="Công việc">
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
          name={'ReportProblem'}
          component={MaintanenceScreen}
          options={{
            title: 'Bảo trì',
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: '700',
            },
          }}
        />
        <Tab.Screen
          name={'RepairRequest'}
          component={RepairScreen}
          options={{
            title: 'Sửa chữa',
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: '700',
            },
          }}
        />
        <Tab.Screen
          name={'ReportWork'}
          component={MaintanenceScreen}
          options={{
            title: 'BC Công việc',
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
