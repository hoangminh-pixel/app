import { AppText } from '@/components';
import Icon from '@react-native-vector-icons/material-icons';
import React from 'react';
import { View } from 'react-native';
import { styles } from '../styles';
import { getSateColor } from '@/utils/stateWork';

export const TaskItem = ({ icon, title, code, status, state }: any) => (
  <View style={styles.taskCard}>
    <Icon name={icon} size={24} color="#064e3b" />
    <View style={{ flex: 1, marginLeft: 12 }}>
      <AppText style={styles.taskTitle}>{title}</AppText>
      <AppText style={styles.taskLocation}>{code}</AppText>
    </View>
    <View style={{ alignItems: 'flex-end' }}>
      <AppText
        style={{
          ...styles.statusBadge,
          color: getSateColor({ state: state }),
        }}
      >
        {status}
      </AppText>
    </View>
  </View>
);
