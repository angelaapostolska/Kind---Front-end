import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import AuthStackNavigator from './AuthStackNavigator';
import MainStackNavigator from './MainStackNavigator';

const Navigation = () => {
  const isSignedIn = useSelector((state: RootState) => state.userState.isSignedIn);
  return <NavigationContainer>{isSignedIn ? <MainStackNavigator /> : <AuthStackNavigator />}</NavigationContainer>;
};

export default Navigation;
