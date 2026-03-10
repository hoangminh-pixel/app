import { AppText } from '@/components';
import Icon from '@react-native-vector-icons/material-icons';
import React from 'react';
import { TextInput, View } from 'react-native';
import { styles } from '../styles';

export const Section = ({ title, icon, marginTop }: any) => (
  <View style={[styles.sectionHeader, { marginTop: marginTop }]}>
    <Icon name={icon} size={18} color="#005a3c" />
    <AppText style={styles.sectionTitle}>{title.toUpperCase()}</AppText>
  </View>
);

export const SectionTitle = ({ title }: any) => (
  <AppText style={styles.sectionTitle}>{title.toUpperCase()}</AppText>
);

export const SectionInput = ({
  label,
  multiline = false,
  value,
  onChangeText,
  onFocus,
  onBlur,
}: any) => (
  <View style={{ flex: 1 }}>
    <AppText style={styles.label}>{label}</AppText>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      style={[
        styles.input,
        multiline && { height: 90, textAlignVertical: 'top' },
      ]}
      multiline={multiline}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  </View>
);
