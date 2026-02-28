import { AppText } from '@/components';
import Icon from '@react-native-vector-icons/material-icons';
import React from 'react';
import { View } from 'react-native';
import { styles } from '../styles';

export const TaskItem = ({ icon, title, location, status, time }: any) => (
  <View style={styles.taskCard}>
    <Icon name={icon} size={24} color="#064e3b" />
    <View style={{ flex: 1, marginLeft: 12 }}>
      <AppText style={styles.taskTitle}>{title}</AppText>
      <AppText style={styles.taskLocation}>{location}</AppText>
    </View>
    <View style={{ alignItems: 'flex-end' }}>
      <AppText style={styles.statusBadge}>{status}</AppText>
      <AppText style={styles.taskTime}>{time}</AppText>
    </View>
  </View>
);
