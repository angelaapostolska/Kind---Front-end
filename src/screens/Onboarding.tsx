import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Extrapolation, interpolate, interpolateColor, useSharedValue } from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeButton } from '@/components';
import { images } from '@/config/Images';
import NavigationScreens from '@/config/NavigationScreens';
import { windowWidth } from '@/constants/layout';
import { theme } from '@/constants/theme';
import { useTypedTranslation } from '@/locales/useTypedTranslation';
import { AuthStackNavigatorParamList } from '@/navigation/types';
import { setHideOnboarding } from '@/store/commonSlices/appSlice';
import { useAppDispatch } from '@/store/store';

interface ICarouselData {
  image: ImageSourcePropType;
  title: string;
  desc: string;
}

const DOT_SIZE = 8;
const ACTIVE_DOT_WIDTH = 32;

const OnboardingScreen = ({ navigation }: NativeStackScreenProps<AuthStackNavigatorParamList, NavigationScreens.Onboarding>) => {
  const { t } = useTypedTranslation();
  const dispatch = useAppDispatch();
  const progressValue = useSharedValue(0);

  const DATA: ICarouselData[] = [
    {
      image: images.onboardingLogo,
      title: t('onboarding.trackTitle'),
      desc: t('onboarding.trackDesc'),
    },
    {
      image: images.onboardingHome,
      title: t('onboarding.safeZonesTitle'),
      desc: t('onboarding.safeZonesDesc'),
    },
    {
      image: images.onboardingMonitor,
      title: t('onboarding.activityTitle'),
      desc: t('onboarding.activityDesc'),
    },
  ];

  const handleLoginPress = () => {
    navigation.navigate(NavigationScreens.Login);
    dispatch(setHideOnboarding(true));
  };

  const renderItem = ({ item }: { item: ICarouselData }) => {
    const { image, title, desc } = item;
    return (
      <View style={styles.carouselItem}>
        <Image source={image} resizeMode="contain" />
        <Text style={styles.carouselTitle}>{title}</Text>
        <Text style={styles.carouselDesc}>{desc}</Text>
      </View>
    );
  };

  const customReanimatedStyle = (progress: number, index: number) => {
    const inputRange = [index - 1, index, index + 1];
    return {
      width: interpolate(progress, inputRange, [DOT_SIZE, ACTIVE_DOT_WIDTH, DOT_SIZE], Extrapolation.CLAMP),
      backgroundColor: interpolateColor(progress, inputRange, [
        theme.colors.icon.inverse,
        theme.colors.icon.action,
        theme.colors.icon.inverse,
      ]),
      borderRadius: DOT_SIZE / 2,
      height: DOT_SIZE,
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.carouselContainer}>
        <Carousel
          style={styles.carousel}
          renderItem={renderItem}
          data={DATA}
          onProgressChange={progressValue}
          width={windowWidth}
          loop={false}
          pagingEnabled={true}
          height={350}
        />
        <Pagination.Custom
          progress={progressValue}
          data={DATA}
          containerStyle={styles.paginationContainer}
          horizontal
          customReanimatedStyle={customReanimatedStyle}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <ThemeButton title={t('onboarding.login')} onPress={handleLoginPress} />
        <View style={styles.registerCard}>
          <Text style={styles.registerCardText}>
            {t('onboarding.joinPetSherlock')}{' '}
            <Text style={[styles.registerCardText, styles.registerCardTextLink]}>{t('onboarding.petSherlockMoreLink')}</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface.two,
  },
  carouselContainer: {
    flex: 1,
  },
  paginationContainer: {
    gap: theme.spacing.xxs,
    marginTop: theme.spacing.xl,
  },
  carousel: {
    marginTop: 100,
  },
  carouselItem: {
    marginHorizontal: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselTitle: {
    color: theme.colors.text.secondary,
    fontFamily: theme.typography.fontVariants.secondary.bold,
    fontSize: theme.typography.fontSize.heading.sm,
    lineHeight: theme.typography.lineHeight.heading.sm,
    marginTop: theme.spacing.xl * 2,
  },
  carouselDesc: {
    color: theme.colors.text.secondary,
    fontFamily: theme.typography.fontVariants.secondary.regular,
    fontSize: theme.typography.fontSize.paragraph.lg,
    lineHeight: theme.typography.lineHeight.paragraph.lg,
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },
  buttonsContainer: {
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  registerCard: {
    backgroundColor: theme.colors.surface.brandPrimary,
    borderWidth: 1,
    borderColor: theme.colors.border.action,
    padding: theme.spacing.md,
    borderRadius: 16,
  },
  registerCardText: {
    fontFamily: theme.typography.fontVariants.secondary.medium,
    fontSize: theme.typography.fontSize.label.sm,
    textAlign: 'center',
    color: theme.colors.text.secondary,
  },
  registerCardTextLink: {
    textDecorationLine: 'underline',
    color: theme.colors.primaryHover,
  },
});

export default OnboardingScreen;
