import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export const MapTabBarIcon = ({ size, color }) => <MaterialCommunityIcons name="map-marker" size={size} color={color} />;

export const HistoryTabBarIcon = ({ size, color }) => <MaterialCommunityIcons name="calendar-month" size={size} color={color} />;

export const WellnessTabBarIcon = ({ size, color }) => <MaterialIcons name="monitor-heart" size={size} color={color} />;

export const MyDogsTabBarIcon = ({ size, color }) => <MaterialIcons name="pets" size={size} color={color} />;

export const SettingsTabBarIcon = ({ size, color }) => <MaterialIcons name="manage-accounts" size={size} color={color} />;
