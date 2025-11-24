import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { ThemeButton } from '@/components';
import { TabBarScreens } from '@/config/NavigationScreens';
import { TabScreenProps } from '@/navigation/types';
import { setSignedIn } from '@/store/commonSlices/userSlice';
import { useAppDispatch } from '@/store/store';
import { showErrorToast } from '@/utils';

const Settings = ({ navigation }: TabScreenProps<TabBarScreens.Settings>) => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('access_token');
      await SecureStore.deleteItemAsync('refresh_token');
      dispatch(setSignedIn(false));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Logout failed:', error);
      showErrorToast('Logout failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <ThemeButton title="Sign Out" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
});

export default Settings;
