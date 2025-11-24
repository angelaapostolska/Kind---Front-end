import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, interpolateColor } from 'react-native-reanimated';
import { theme } from '@/constants/theme';
import { ANIMATION_DURATION } from './CustomTabBar';

export interface ILabel {
  focused: boolean;
  label: string;
}

const AnimatedTabLabel = ({ focused, label }: ILabel) => {
  const progress = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(focused ? 1 : 0, { duration: ANIMATION_DURATION });
  }, [focused, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(progress.value, [0, 1], [theme.colors.icon.inverse, '#FDFDFD']);
    return {
      color,
    };
  });

  return (
    <Animated.Text
      style={[
        styles.tabBarLabelStyle,
        {
          fontFamily: theme.typography.fontVariants.secondary[focused ? 'medium' : 'regular'],
        },
        animatedStyle,
      ]}
    >
      {label}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: 10,
    marginTop: theme.spacing.xxxs,
  },
});

export default AnimatedTabLabel;
