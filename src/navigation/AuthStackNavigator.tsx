import React from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { HeaderBackButton } from '@/components';
import NavigationScreens from '@/config/NavigationScreens';
import { theme } from '@/constants/theme';
import Login from '@/screens/Login';
import OnboardingScreen from '@/screens/Onboarding';
import { RootState } from '@/store/store';
import { AuthStackNavigatorParamList } from './types';

const AuthStack = createNativeStackNavigator<AuthStackNavigatorParamList>();

const AuthStackNavigator = () => {
  const hideOnboarding = useSelector((state: RootState) => state.appState.hideOnboarding);
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackNavigatorParamList>>();

  const handleNavigateToOnboarding = () => {
    navigation.dispatch(StackActions.replace(NavigationScreens.Onboarding));
  };

  return (
    <AuthStack.Navigator
      initialRouteName={hideOnboarding ? NavigationScreens.Login : NavigationScreens.Onboarding}
      screenOptions={{
        animationTypeForReplace: 'pop',
      }}
    >
      <AuthStack.Screen
        name={NavigationScreens.Onboarding}
        component={OnboardingScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name={NavigationScreens.Login}
        component={Login}
        options={{
          headerLeft: () => <HeaderBackButton onPress={handleNavigateToOnboarding} />,
          headerTitle: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme.colors.surface.two,
          },
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
