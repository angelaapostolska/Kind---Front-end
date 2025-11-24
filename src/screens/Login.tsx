import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import { useLoginMutation } from '@/api/authApi';
import { ScreenTitle, FindzzerTextField, FindzzerButton } from '@/components';
import { images } from '@/config/Images';
import NavigationScreens from '@/config/NavigationScreens';
import { theme } from '@/constants/theme';
import { useTypedTranslation } from '@/locales/useTypedTranslation';
import { AuthStackNavigatorParamList } from '@/navigation/types';
import { setSignedIn } from '@/store/commonSlices/userSlice';
import { useAppDispatch } from '@/store/store';
import { showErrorToast } from '@/utils';

const Login = ({ navigation }: NativeStackScreenProps<AuthStackNavigatorParamList, NavigationScreens.Login>) => {
  const { t } = useTypedTranslation();
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  const handleChangePassword = (text: string) => {
    setPassword(text);
  };

  const handleLoginPress = async () => {
    try {
      const response = await login({ email: 'test@test.com', password: '123456789' }).unwrap();

      // Save tokens
      await SecureStore.setItemAsync('access_token', response.token);
      await SecureStore.setItemAsync('refresh_token', response.token);

      dispatch(setSignedIn(true));
    } catch (err: unknown) {
      let errorMsg = 'Login failed';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof err === 'object' && err !== null && 'data' in err && typeof (err as any).data?.error_description === 'string') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        errorMsg = (err as any).data.error_description;
      }
      showErrorToast(errorMsg);
    }
  };

  return (
    <View style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View>
            <View style={styles.logoContent}>
              <Image source={images.loginLogo} />
              <ScreenTitle title={t('login.title')} containerStyle={styles.title} />
            </View>
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <FindzzerTextField label={t('login.emailPlaceholder')} onChangeText={setEmail} value={email}></FindzzerTextField>
                <FindzzerTextField
                  label={t('login.passwordPlaceholder')}
                  check="password"
                  onChangeText={handleChangePassword}
                  value={password}
                ></FindzzerTextField>
                <TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
                  <Text style={styles.forgotPass}>{t('login.forgotPass')}</Text>
                </TouchableOpacity>
              </View>
              <FindzzerButton onPress={handleLoginPress} loading={isLoading}>
                {t('login.login')}
              </FindzzerButton>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.surface.two,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  logoContent: {
    alignItems: 'center',
    marginTop: theme.spacing.xs,
  },
  title: {
    marginTop: theme.spacing.md,
  },
  formContainer: {
    marginTop: theme.spacing.xxxl,
    marginHorizontal: theme.spacing.md,
  },
  inputContainer: {
    gap: theme.spacing.sm,
  },
  forgotPass: {
    color: theme.colors.text.secondary,
    fontFamily: theme.typography.fontVariants.secondary.semibold,
    fontSize: theme.typography.fontSize.label.md,
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
  },
});

export default Login;
