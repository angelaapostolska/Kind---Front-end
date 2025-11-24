import React, { forwardRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, StyleProp, ViewStyle, TouchableOpacity, TextStyle } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TestIDs } from '@/constants/TestIDs';
import { theme } from '@/constants/theme';

interface IProps extends TextInputProps {
  onChangeText: (text: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  isValid?: boolean;
  errorMessage?: string;
}

const ThemePasswordInput = forwardRef<TextInput, IProps>(
  ({ value, onChangeText, placeholder, containerStyle, inputStyle, disabled, isValid = true, errorMessage, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleEyePress = () => setIsVisible((prev) => !prev);

    return (
      <View>
        <View
          style={[styles.container, containerStyle, !isValid && styles.containerError]}
          testID={TestIDs.Components.ThemePasswordInput.Container}
        >
          {!value ? <Text style={styles.placeholder}>{placeholder}</Text> : null}
          <TextInput
            ref={ref}
            secureTextEntry={!isVisible}
            value={value}
            onChangeText={onChangeText}
            style={[styles.input, inputStyle]}
            {...props}
            testID={TestIDs.Components.ThemePasswordInput.TextInput}
          />
          <TouchableOpacity activeOpacity={0.6} onPress={handleEyePress} testID={TestIDs.Components.ThemePasswordInput.EyeBtn}>
            <MaterialCommunityIcons name={`eye${isVisible ? '-off' : ''}`} size={24} color="black" style={styles.eye} />
          </TouchableOpacity>
        </View>
        {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      </View>
    );
  },
);

ThemePasswordInput.displayName = 'ThemePasswordInput';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colors.surface.one,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border.three,
    paddingVertical: theme.spacing.xxs,
    paddingRight: theme.spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerError: {
    borderBottomWidth: 3,
    borderBottomColor: theme.colors.text.error,
  },
  input: {
    flex: 1,
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
  eye: {},
  errorMessage: {
    fontFamily: theme.typography.fontVariants.secondary.semibold,
    fontSize: theme.typography.fontSize.label.xs,
    color: theme.colors.text.error,
    marginTop: theme.spacing.xs,
    marginLeft: theme.spacing.sm,
  },
});

export default ThemePasswordInput;
