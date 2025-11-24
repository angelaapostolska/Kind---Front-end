import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TabBarScreens } from '@/config/NavigationScreens';
import { TabScreenProps } from '@/navigation/types';

const MyDogs = ({ navigation }: TabScreenProps<TabBarScreens.MyDogs>) => {
  return (
    <View style={styles.container}>
      <Text>MyDogs</Text>
    </View>
  );
};

const styles = StyleSheet.create({ container: {} });

export default MyDogs;
