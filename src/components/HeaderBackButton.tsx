import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TestIDs } from '@/constants/TestIDs';
import { theme } from '@/constants/theme';
import { useTypedTranslation } from '@/locales/useTypedTranslation';

interface IProps {
  onPress: () => void;
}

const HeaderBackButton = ({ onPress }: IProps) => {
  const { t } = useTypedTranslation();
  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.container} onPress={onPress} testID={TestIDs.Components.HeaderBackButton.Container}>
      <MaterialIcons name="arrow-back" size={24} color={theme.colors.icon.primary} />
      <Text style={styles.text}>{t('common.back')}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  text: {
    fontFamily: theme.typography.fontVariants.brand.semibold,
    fontSize: theme.typography.fontSize.paragraph.md,
    color: theme.colors.text.secondary,
  },
});

export default HeaderBackButton;
