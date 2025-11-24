// src/navigation/TabBar.jsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TabBarScreens } from '../config/NavigationScreens';
import Home from '../tabs/Home';
import Mood from '../tabs/Mood';
import Journal from '../tabs/Journal';
import Resources from '../tabs/Resources';
import Profile from '../tabs/Profile';

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6C5CE7',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tab.Screen
        name={TabBarScreens.Home}
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name={TabBarScreens.Mood}
        component={Mood}
        options={{
          tabBarLabel: 'Mood',
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="emoticon-happy" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name={TabBarScreens.Journal}
        component={Journal}
        options={{
          tabBarLabel: 'Journal',
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="notebook" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name={TabBarScreens.Resources}
        component={Resources}
        options={{
          tabBarLabel: 'Resources',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="spa" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name={TabBarScreens.Profile}
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;
