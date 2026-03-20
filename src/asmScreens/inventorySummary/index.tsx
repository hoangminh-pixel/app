import { BasePage } from '@/components';
import { PRIMARY } from '@/utils/color';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import SummaryScreen from './summary';
import DetailInventory from './detail';
import { useAppRoute } from '@/navigation/NavigationService';
import useSummary from './hooks/useSummary';

const Tab = createMaterialTopTabNavigator();

const InventorySummaryScreen = () => {
  const {
    data,
    locationId,
    inventoryId,
    inventoried,
    handleCompleteInventory,
  } = useSummary();

  return (
    <BasePage paddingHorizontal={0} title="Kiểm kê" showBack>
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
          name="Summary"
          options={{
            title: 'Tổng quan',
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: '700',
            },
          }}
        >
          {() => (
            <SummaryScreen
              data={data}
              locationId={locationId}
              inventoryId={inventoryId}
              inventoried={inventoried}
              handleCompleteInventory={handleCompleteInventory}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name={'Detail'}
          options={{
            title: 'Chi tiết',
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: '700',
            },
          }}
        >
          {() => (
            <DetailInventory
              data={data}
              inventoried={inventoried}
              handleCompleteInventory={handleCompleteInventory}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </BasePage>
  );
};
export default InventorySummaryScreen;
