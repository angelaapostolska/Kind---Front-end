import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, interpolateColor } from 'react-native-reanimated';
import PropTypes from 'prop-types';
import { theme } from '@/constants/theme';
import { ANIMATION_DURATION } from './CustomTabBar';

const AnimatedTabLabel = ({ focused, label }) => {
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

AnimatedTabLabel.propTypes = {
  focused: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: 10,
    marginTop: theme.spacing.xxxs,
  },
});

export default AnimatedTabLabel;
