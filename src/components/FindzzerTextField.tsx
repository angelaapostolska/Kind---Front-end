import React, { useRef } from 'react';
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { AsYouType, isValidPhoneNumber } from 'libphonenumber-js';
import { useTranslation } from 'react-i18next';
import { HelperText, TextInput, TextInputProps } from 'react-native-paper';

type CheckType = 'email' | 'username' | 'phone' | 'number' | 'password' | 'confirmPassword' | 'required';

type FindzzerTextFieldProps = TextInputProps & {
  errorText?: string;
  containerStyle?: StyleProp<ViewStyle>;
  check?: CheckType | CheckType[];
  compareValue?: string; // for confirmPassword
  onValidationChange?: (hasError: boolean) => void; // return to parent
  asyncValidation?: (value: string) => Promise<string | null>; // optional API validation
  scrollRef?: React.RefObject<ScrollView>; // scroll parent
};

const FindzzerTextField: React.FC<FindzzerTextFieldProps> = ({
  errorText,
  containerStyle,
  style,
  outlineStyle,
  check,
  compareValue,
  value,
  onChangeText,
  onValidationChange,
  asyncValidation,
  scrollRef,
  ...rest
}) => {
  const { t } = useTranslation();
  const [internalError, setInternalError] = React.useState('');
  const [touched, setTouched] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const inputWrapperRef = useRef<View>(null);

  const validate = React.useCallback(
    (text: string): string => {
      const checks = Array.isArray(check) ? check : [check];
      let err = '';

      if (checks.includes('required') && (!text || text.trim() === '')) {
        err = t('field_required');
      } else if (checks.includes('email')) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(text)) err = t('please_enter_valid_email');
      } else if (checks.includes('phone')) {
        const formattedPhone = new AsYouType().input(text);
        if (!isValidPhoneNumber(formattedPhone)) {
          err = t('valid_phone_number');
        }
      } else if (checks.includes('number')) {
        if (isNaN(Number(text))) err = t('must_be_number');
      } else if (checks.includes('password')) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(text)) {
          err = t('password_criteria');
        }
      } else if (checks.includes('confirmPassword')) {
        if (text !== compareValue) {
          err = t('passwords_do_not_match');
        }
      }

      setInternalError(err);
      onValidationChange?.(!err);
      return err;
    },
    [check, compareValue, onValidationChange, t],
  );

  const handleChangeText = (text: string) => {
    if (onChangeText) onChangeText(text);
    if (touched || check) validate(text);
  };

  const handleBlur = async () => {
    setTouched(true);
    if (value && check) {
      const syncError = validate(value.toString());

      if (!syncError && asyncValidation) {
        const asyncError = await asyncValidation(value.toString());
        setInternalError(asyncError || '');
        onValidationChange?.(!asyncError);
      }
    }
  };

  const handleFocus = () => {
    if (scrollRef?.current && inputWrapperRef.current) {
      setTimeout(() => {
        inputWrapperRef.current?.measure((x, y, width, height, pageX, pageY) => {
          scrollRef.current?.scrollTo({ y: y - 20, animated: true });
        });
      }, 100);
    }
  };

  const keyboardType = check === 'email' ? 'email-address' : check === 'phone' || check === 'number' ? 'numeric' : rest.keyboardType;

  return (
    <View ref={inputWrapperRef} style={containerStyle}>
      <TextInput
        dense
        value={value}
        onChangeText={handleChangeText}
        onBlur={handleBlur}
        onFocus={handleFocus}
        textAlignVertical={rest.multiline ? 'top' : 'center'}
        style={[
          {
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            minHeight: rest.multiline ? 100 : undefined,
          },
          style,
        ]}
        underlineStyle={{
          marginHorizontal: 6,
          borderColor: '#6A6A6A',
          borderRadius: 12,
        }}
        mode="outlined"
        contentStyle={[styles.outline]}
        outlineStyle={[styles.outline, outlineStyle]}
        error={!!internalError}
        keyboardType={keyboardType}
        secureTextEntry={(check === 'password' || check === 'confirmPassword') && !showPassword}
        right={
          check === 'password' || check === 'confirmPassword' ? (
            <TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={() => setShowPassword(!showPassword)} />
          ) : (
            rest.right
          )
        }
        {...rest}
      />
      {!!internalError && (
        <HelperText type="error" visible={true}>
          {internalError || errorText}
        </HelperText>
      )}
    </View>
  );
};

export default FindzzerTextField;

const styles = StyleSheet.create({
  outline: {
    borderRadius: 8,
  },
});
