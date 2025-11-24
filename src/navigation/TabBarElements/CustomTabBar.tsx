import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { windowWidth } from '@/constants/layout';
import { theme } from '@/constants/theme';

export const ANIMATION_DURATION = 200;
const ICON_SIZE = 24;

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const tabCount = state.routes.length;
  const tabWidth = windowWidth / tabCount;
  const translateX = useSharedValue(state.index * tabWidth);

  useEffect(() => {
    translateX.value = withTiming(state.index * tabWidth, { duration: ANIMATION_DURATION });
  }, [state.index, tabWidth, translateX]);

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value + tabWidth / 2 - 4 }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.indicator, animatedIndicatorStyle]} />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : (options.title ?? route.name);

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const icon = options.tabBarIcon?.({
          focused: isFocused,
          color: isFocused ? '#FDFDFD' : theme.colors.icon.inverse,
          size: ICON_SIZE,
        });

        return (
          <TouchableOpacity key={route.key} onPress={onPress} style={styles.tabButton} activeOpacity={0.8}>
            {icon}
            {typeof label === 'function'
              ? label({
                  focused: isFocused,
                  color: isFocused ? '#fff' : theme.colors.icon.inverse,
                  position: 'beside-icon',
                  children: '',
                })
              : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface.actionPressed,
    height: 90,
    paddingBottom: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    position: 'absolute',
    top: 10,
    width: 8,
    height: 4,
    backgroundColor: theme.colors.border.warning,
    borderRadius: 2,
  },
});

export default CustomTabBar;
