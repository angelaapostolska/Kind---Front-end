// src/navigation/index.jsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AuthStackNavigator from './AuthStackNavigator';
import MainStackNavigator from './MainStackNavigator';

const Navigation = () => {
  const isSignedIn = useSelector((state) => state.userState.isSignedIn);

  return <NavigationContainer>{isSignedIn ? <MainStackNavigator /> : <AuthStackNavigator />}</NavigationContainer>;
};

export default Navigation;
