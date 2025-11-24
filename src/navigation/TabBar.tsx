import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBarScreens } from '@/config/NavigationScreens';
import History from '@/tabs/History';
import Map from '@/tabs/Map';
import MyDogs from '@/tabs/MyDogs';
import Settings from '@/tabs/Settings';
import Wellness from '@/tabs/Wellness';
import AnimatedTabLabel, { ILabel } from './TabBarElements/AnimatedTabBarLabel';
import CustomTabBar from './TabBarElements/CustomTabBar';
import { MapTabBarIcon, HistoryTabBarIcon, WellnessTabBarIcon, MyDogsTabBarIcon, SettingsTabBarIcon } from './TabBarElements/TabBarIcons';
import { TabBarParamList } from './types';

const Tab = createBottomTabNavigator<TabBarParamList>();

const AppTabs = () => {
  const renderLabel = ({ focused, label }: ILabel) => {
    return <AnimatedTabLabel focused={focused} label={label} />;
  };

  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen
        name={TabBarScreens.Map}
        component={Map}
        options={{
          tabBarIcon: MapTabBarIcon,
          tabBarLabel: ({ focused }) => renderLabel({ focused, label: 'Map' }),
        }}
      />
      <Tab.Screen
        name={TabBarScreens.History}
        component={History}
        options={{
          tabBarIcon: HistoryTabBarIcon,
          tabBarLabel: ({ focused }) => renderLabel({ focused, label: 'History' }),
        }}
      />
      <Tab.Screen
        name={TabBarScreens.Wellness}
        component={Wellness}
        options={{
          tabBarIcon: WellnessTabBarIcon,
          tabBarLabel: ({ focused }) => renderLabel({ focused, label: 'Wellness' }),
        }}
      />
      <Tab.Screen
        name={TabBarScreens.MyDogs}
        component={MyDogs}
        options={{
          tabBarIcon: MyDogsTabBarIcon,
          tabBarLabel: ({ focused }) => renderLabel({ focused, label: 'MyDogs' }),
        }}
      />
      <Tab.Screen
        name={TabBarScreens.Settings}
        component={Settings}
        options={{
          tabBarIcon: SettingsTabBarIcon,
          tabBarLabel: ({ focused }) => renderLabel({ focused, label: 'Settings' }),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;
