import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationScreens from '@/config/NavigationScreens';
import AppTabs from './TabBar';
import { MainStackNavigatorParamList } from './types';

const MainStack = createNativeStackNavigator<MainStackNavigatorParamList>();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator
      initialRouteName={NavigationScreens.TabBar}
      screenOptions={{
        animationTypeForReplace: 'push',
        animation: 'slide_from_right',
        headerShown: false,
      }}
    >
      <MainStack.Screen name={NavigationScreens.TabBar} component={AppTabs} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
