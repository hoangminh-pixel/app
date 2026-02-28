import { PRIMARY } from '@/utils/color';
import Icon from '@react-native-vector-icons/material-icons';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

export const FilterButton = ({
  label,
  active = false,
  icon,
  onPress,
  ref,
}: any) => (
  <TouchableOpacity
    ref={ref}
    style={[styles.filterBtn, active && { backgroundColor: PRIMARY }]}
    onPress={onPress}
  >
    <Text
      style={[
        styles.filterText,
        active && { color: '#fff', fontWeight: '600' },
      ]}
    >
      {label}
    </Text>
    {icon && (
      <Icon
        name={icon}
        size={16}
        color={active ? '#fff' : '#666'}
        style={{ marginLeft: 6 }}
      />
    )}
  </TouchableOpacity>
);
