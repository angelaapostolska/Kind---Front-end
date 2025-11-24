import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavigationScreens from '@/config/NavigationScreens';
import { MainStackNavigatorParamList } from '@/navigation/types';

const Home = ({ navigation }: NativeStackScreenProps<MainStackNavigatorParamList, NavigationScreens.Home>) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({ container: {} });

export default Home;
