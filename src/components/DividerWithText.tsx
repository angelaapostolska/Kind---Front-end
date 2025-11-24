import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { theme } from '@/constants/theme';

interface IProps {
  text: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const DividerWithText = ({ text, containerStyle }: IProps) => {
  return (
    <View style={[styles.contaier, containerStyle]}>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  contaier: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border.three,
  },
  text: {
    fontFamily: theme.typography.fontVariants.secondary.semibold,
    fontSize: theme.typography.fontSize.label.md,
    color: theme.colors.text.disabled,
    marginHorizontal: theme.spacing.xs,
    textAlign: 'center',
  },
});

export default DividerWithText;
