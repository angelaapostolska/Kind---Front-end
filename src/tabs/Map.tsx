import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TabBarScreens } from '@/config/NavigationScreens';
import { TabScreenProps } from '@/navigation/types';

const Map = ({ navigation }: TabScreenProps<TabBarScreens.Map>) => {
  return (
    <View style={styles.container}>
      <Text>Map</Text>
    </View>
  );
};

const styles = StyleSheet.create({ container: {} });

export default Map;
