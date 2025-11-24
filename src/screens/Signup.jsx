import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { ScreenTitle, ThemeInput, ThemePasswordInput, ThemeButton } from '@/components';
import NavigationScreens from '@/config/NavigationScreens';
import { theme } from '@/constants/theme';
import { showErrorToast } from '@/utils';

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignupPress = async () => {
    if (!name || !email || !password) {
      showErrorToast('Please fill in all fields');
      return;
    }
    // TODO: Implement signup API call
    showErrorToast('Signup not implemented yet');
  };

  const handleLoginPress = () => {
    navigation.navigate(NavigationScreens.Login);
  };

  return (
    <View style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            <View style={styles.headerContent}>
              <ScreenTitle title="Create Account" containerStyle={styles.title} />
            </View>
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <ThemeInput placeholder="Full Name" onChangeText={setName} value={name} autoCapitalize="words" />
                <ThemeInput placeholder="Email" onChangeText={setEmail} value={email} autoCapitalize="none" keyboardType="email-address" />
                <ThemePasswordInput placeholder="Password" onChangeText={setPassword} value={password} />
              </View>
              <ThemeButton title="Sign Up" onPress={handleSignupPress} />
              <TouchableOpacity onPress={handleLoginPress} style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.surface.two,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingTop: theme.spacing.xxxl,
  },
  headerContent: {
    alignItems: 'center',
    marginTop: theme.spacing.xl,
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
  loginContainer: {
    marginTop: theme.spacing.md,
    alignItems: 'center',
  },
  loginText: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.paragraph.md,
  },
});

export default Signup;
s;
