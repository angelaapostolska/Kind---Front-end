import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { images } from '@/config/Images';
import { theme } from '@/constants/theme';

interface IProps {
  onPress: () => void;
}

const GoogleAuthButton = ({ onPress }: IProps) => {
  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.container} onPress={onPress}>
      <Image source={images.googleLogo} style={styles.icon} resizeMode="contain" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.sm,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  icon: {
    width: 20,
  },
});

export default GoogleAuthButton;
