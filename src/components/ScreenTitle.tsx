import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { theme } from '@/constants/theme';

interface IProps {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const ScreenTitle = ({ title, containerStyle }: IProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontFamily: theme.typography.fontVariants.secondary.semibold,
    fontSize: theme.typography.fontSize.heading.sm,
    color: theme.colors.text.actionHover,
  },
});

export default ScreenTitle;
