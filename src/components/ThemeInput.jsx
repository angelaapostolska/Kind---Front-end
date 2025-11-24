import React, { forwardRef } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { TestIDs } from '@/constants/TestIDs';
import { theme } from '@/constants/theme';

interface IProps extends TextInputProps {
  onChangeText: (text: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
  isValid?: boolean;
  errorMessage?: string;
}

const ThemeInput = forwardRef<TextInput, IProps>(
  ({ value, placeholder, onChangeText, containerStyle, inputStyle, placeholderStyle, isValid = true, errorMessage, ...props }, ref) => {
    return (
      <View>
        <View
          style={[styles.container, containerStyle, !isValid && styles.containerError]}
          testID={TestIDs.Components.ThemeInput.Container}
        >
          {!value ? <Text style={[styles.placeholder, placeholderStyle]}>{placeholder}</Text> : null}
          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            style={[styles.input, inputStyle]}
            {...props}
            testID={TestIDs.Components.ThemeInput.TextInput}
          />
        </View>
        {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      </View>
    );
  },
);

ThemeInput.displayName = 'ThemeInput';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colors.surface.one,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border.three,
    paddingVertical: theme.spacing.xxs,
  },
  containerError: {
    borderBottomWidth: 3,
    borderBottomColor: theme.colors.text.error,
  },
  input: {
    fontSize: theme.typography.fontSize.paragraph.md,
    fontFamily: theme.typography.fontVariants.secondary.regular,
    color: theme.colors.text.secondary,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
  },
  placeholder: {
    position: 'absolute',
    top: theme.spacing.sm,
    left: theme.spacing.sm,
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.paragraph.md,
    fontFamily: theme.typography.fontVariants.secondary.regular,
    lineHeight: theme.typography.lineHeight.paragraph.md,
  },
  errorMessage: {
    fontFamily: theme.typography.fontVariants.secondary.semibold,
    fontSize: theme.typography.fontSize.label.xs,
    color: theme.colors.text.error,
    marginTop: theme.spacing.xs,
    marginLeft: theme.spacing.sm,
  },
});

export default ThemeInput;
