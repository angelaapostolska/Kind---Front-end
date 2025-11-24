import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TabBarScreens } from '@/config/NavigationScreens';
import { TabScreenProps } from '@/navigation/types';

const Wellness = ({ navigation }: TabScreenProps<TabBarScreens.Wellness>) => {
  return (
    <View style={styles.container}>
      <Text>Wellness</Text>
    </View>
  );
};

const styles = StyleSheet.create({ container: {} });

export default Wellness;
