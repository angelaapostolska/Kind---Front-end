import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TabBarScreens } from '@/config/NavigationScreens';
import { TabScreenProps } from '@/navigation/types';

const History = ({ navigation }: TabScreenProps<TabBarScreens.History>) => {
  return (
    <View style={styles.container}>
      <Text>History</Text>
    </View>
  );
};

const styles = StyleSheet.create({ container: {} });

export default History;
