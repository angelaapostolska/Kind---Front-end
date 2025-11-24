import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, StyleProp, TextStyle, ViewStyle, View } from 'react-native';
import { TestIDs } from '@/constants/TestIDs';
import { theme } from '@/constants/theme';

type ButtonType = 'outline' | 'fill';

interface IProps {
  title: string;
  onPress: () => void;
  type?: ButtonType;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loading?: boolean;
}

const ThemeButton = ({ title, onPress, type = 'fill', titleStyle, containerStyle, disabled = false, loading = false }: IProps) => {
  const isOutline = type === 'outline';

  const getContainerStyle = (): ViewStyle => {
    if (disabled) {
      return {
        backgroundColor: theme.colors.surface.disabled,
      };
    }
    if (isOutline) {
      return {
        backgroundColor: theme.colors.white,
        borderColor: theme.colors.border.action,
        borderWidth: 1,
      };
    }

    return {
      backgroundColor: theme.colors.primary,
    };
  };

  const getTitleStyle = (): TextStyle => {
    if (disabled) {
      return {
        color: theme.colors.text.onDisabled,
      };
    }
    return {
      color: isOutline ? theme.colors.text.action : theme.colors.text.onAction,
    };
  };

  const renderContent = () => (
    <View style={styles.content}>
      {loading ? (
        <ActivityIndicator color={theme.colors.white} testID={TestIDs.Components.ThemeButton.ActivityIndicator} />
      ) : (
        <Text style={[styles.title, getTitleStyle(), titleStyle]}>{title}</Text>
      )}
    </View>
  );

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.container, getContainerStyle(), containerStyle]}
      disabled={disabled || loading}
      testID={TestIDs.Components.ThemeButton.Container}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: theme.typography.fontVariants.brand.medium,
    fontSize: theme.typography.fontSize.paragraph.md,
    lineHeight: theme.typography.lineHeight.paragraph.md,
  },
});

export default ThemeButton;
