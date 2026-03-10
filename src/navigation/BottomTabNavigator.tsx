import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, LoginScreen } from '@/screens';
import { HomeIcon } from '@/assets/icons';
import MainStack from './MainStack';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import ReportScreen from '@/screens/request/createReportProblem';
import RequestTopTabs from '@/screens/request';
import WorkTopTabs from '@/screens/works';

export type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
  Calendar: undefined;
  Report: undefined;
  Task: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          const color = focused ? '#005a3c' : '#999';

          switch (route.name) {
            case 'Home':
              return <MaterialIcons name="home" size={26} color={color} />;

            case 'Profile':
              return <MaterialIcons name="person" size={26} color={color} />;

            case 'Calendar':
              return (
                <MaterialIcons name="calendar-month" size={26} color={color} />
              );

            case 'Report':
              return (
                <MaterialIcons name="assessment" size={26} color={color} />
              );

            case 'Task':
              return (
                <MaterialIcons name="assignment" size={26} color={color} />
              );

            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen name="Task" component={WorkTopTabs} />
      <Tab.Screen name="Report" component={RequestTopTabs} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={WorkTopTabs} />
      <Tab.Screen name="Profile" component={LoginScreen} />

      {/* <Tab.Screen name="Report" component={ReportScreen} /> */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
