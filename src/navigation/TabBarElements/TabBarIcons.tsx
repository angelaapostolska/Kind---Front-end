import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface IProps {
  focused: boolean;
  size: number;
  color: string;
}

export const MapTabBarIcon = ({ size, color }: IProps) => <MaterialCommunityIcons name="map-marker" size={size} color={color} />;

export const HistoryTabBarIcon = ({ size, color }: IProps) => <MaterialCommunityIcons name="calendar-month" size={size} color={color} />;

export const WellnessTabBarIcon = ({ size, color }: IProps) => <MaterialIcons name="monitor-heart" size={size} color={color} />;

export const MyDogsTabBarIcon = ({ size, color }: IProps) => <MaterialIcons name="pets" size={size} color={color} />;

export const SettingsTabBarIcon = ({ size, color }: IProps) => <MaterialIcons name="manage-accounts" size={size} color={color} />;
