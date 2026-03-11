import { AppText } from '@/components';
import Icon from '@react-native-vector-icons/material-icons';
import React from 'react';
import { Pressable, View } from 'react-native';
import { styles } from '../styles';

export const StatusCard = ({ icon, number, label, color, onPress }: any) => (
  <Pressable onPress={onPress} style={styles.statusCard}>
    <Icon name={icon} size={24} color={color} />
    <AppText style={styles.statusNumber}>{number}</AppText>
    <AppText style={styles.statusLabel}>{label}</AppText>
  </Pressable>
);
