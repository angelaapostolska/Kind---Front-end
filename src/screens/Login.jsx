import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useLoginMutation } from '@/api/authApi';
import { ScreenTitle, ThemeInput, ThemePasswordInput, ThemeButton } from '@/components';
import { images } from '@/config/Images';
import NavigationScreens from '@/config/NavigationScreens';
import { theme } from '@/constants/theme';
import { setSignedIn } from '@/store/commonSlices/userSlice';
import { useAppDispatch } from '@/store/store';
import { showErrorToast } from '@/utils';

const Login = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginPress = async () => {
    try {
      const response = await login({ email: email, password: password }).unwrap();

      // Save tokens
      await SecureStore.setItemAsync('access_token', response.token);
      await SecureStore.setItemAsync('refresh_token', response.token);

      dispatch(setSignedIn(true));
    } catch (err) {
      let errorMsg = 'Login failed';
      if (typeof err === 'object' && err !== null && 'data' in err && typeof err.data?.error_description === 'string') {
        errorMsg = err.data.error_description;
      }
      showErrorToast(errorMsg);
    }
  };

  const handleSignupPress = () => {
    navigation.navigate(NavigationScreens.Signup);
  };

  return (
    <View style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View>
            <View style={styles.logoContent}>
              <Image source={images.loginLogo} />
              <ScreenTitle title="Welcome Back" containerStyle={styles.title} />
            </View>
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <ThemeInput placeholder="Email" onChangeText={setEmail} value={email} autoCapitalize="none" keyboardType="email-address" />
                <ThemePasswordInput placeholder="Password" onChangeText={setPassword} value={password} />
                <TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
                  <Text style={styles.forgotPass}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
              <ThemeButton title="Log In" onPress={handleLoginPress} loading={isLoading} />
              <TouchableOpacity onPress={handleSignupPress} style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
              </TouchableOpacity>
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
    marginBottom: theme.spacing.lg,
  },
  forgotPass: {
    color: theme.colors.text.secondary,
    fontFamily: theme.typography.fontVariants.secondary.semibold,
    fontSize: theme.typography.fontSize.label.md,
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
  },
  signupContainer: {
    marginTop: theme.spacing.md,
    alignItems: 'center',
  },
  signupText: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.paragraph.md,
  },
});

export default Login;
