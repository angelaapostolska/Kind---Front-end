import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavigationScreens, { TabBarScreens } from '@/config/NavigationScreens';

export type MainStackNavigatorParamList = {
  [NavigationScreens.TabBar]: NavigatorScreenParams<TabBarParamList>;
  [NavigationScreens.Home]: undefined;
};

export type AuthStackNavigatorParamList = {
  [NavigationScreens.Onboarding]: undefined;
  [NavigationScreens.Login]: undefined;
};

export type TabBarParamList = {
  [TabBarScreens.Map]: undefined;
  [TabBarScreens.History]: undefined;
  [TabBarScreens.Wellness]: undefined;
  [TabBarScreens.MyDogs]: undefined;
  [TabBarScreens.Settings]: undefined;
};

export type RootStackParamList = {
  MainStack: NavigatorScreenParams<MainStackNavigatorParamList>;
  AuthStack: NavigatorScreenParams<AuthStackNavigatorParamList>;
};

export type AuthScreenProps<T extends keyof AuthStackNavigatorParamList> = NativeStackScreenProps<AuthStackNavigatorParamList, T>;

export type MainScreenProps<T extends keyof MainStackNavigatorParamList> = NativeStackScreenProps<MainStackNavigatorParamList, T>;

export type TabScreenProps<T extends keyof TabBarParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabBarParamList, T>,
  MainScreenProps<keyof MainStackNavigatorParamList>
>;
