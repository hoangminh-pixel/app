import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, LoginScreen } from '@/screens';
import { HomeIcon } from '@/assets/icons';
import MainStack from './MainStack';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import ReportScreen from '@/screens/request/createReportProblem';
import RequestTopTabs from '@/screens/request';
import WorkTopTabs from '@/screens/works';
import { Text, View } from 'react-native';
import { AppText } from '@/components';
import DashboardScreen from '@/screens/dashboard';
import CalendarScreen from '@/screens/calendar';

export type MainTabParamList = {
  Home: undefined;
  Dashboard: undefined;
  Calendar: undefined;
  Report: undefined;
  Task: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#005a3c',
        // tabBarLabel: ({ focused }) => {
        //   const color = focused ? '#005a3c' : '#999';

        //   switch (route.name) {
        //     case 'Home':
        //       return <Text>Trang chủ</Text>;

        //     case 'Profile':
        //       return <Text>Trang chủ</Text>;

        //     case 'Calendar':
        //       return <Text>Trang chủ</Text>;

        //     case 'Report':
        //       return <Text>Trang chủ</Text>;

        //     case 'Task':
        //       return <Text>Trang chủ</Text>;

        //     default:
        //       return null;
        //   }
        // },
        tabBarIcon: ({ focused }) => {
          const color = focused ? '#005a3c' : '#999';

          switch (route.name) {
            case 'Home':
              return (
                <View>
                  <MaterialIcons name="home" size={26} color={color} />
                </View>
              );

            case 'Dashboard':
              return <MaterialIcons name="dashboard" size={26} color={color} />;

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
      <Tab.Screen
        name="Task"
        component={WorkTopTabs}
        options={{ tabBarLabel: 'Công việc' }}
      />
      <Tab.Screen
        name="Report"
        component={RequestTopTabs}
        options={{ tabBarLabel: 'Yêu cầu' }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Trang chủ' }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ tabBarLabel: 'Lịch' }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ tabBarLabel: 'Báo cáo' }}
      />

      {/* <Tab.Screen name="Report" component={ReportScreen} /> */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
