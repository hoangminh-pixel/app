import { AppText } from '@/components';
import Icon from '@react-native-vector-icons/material-icons';
import React from 'react';
import { TextInput, View } from 'react-native';
import { styles } from '../styles';

export const Section = ({ title, icon }: any) => (
  <View style={styles.sectionHeader}>
    <Icon name={icon} size={18} color="#005a3c" />
    <AppText style={styles.sectionTitle}>{title.toUpperCase()}</AppText>
  </View>
);


export const SectionTitle = ({ title }: any) => (
  <AppText style={styles.sectionTitle}>{title.toUpperCase()}</AppText>
);

export const SectionInput = ({ label, multiline = false }: any) => (
  <View style={{ flex: 1 }}>
    <AppText style={styles.label}>{label}</AppText>
    <TextInput
      style={[
        styles.input,
        multiline && { height: 90, textAlignVertical: 'top' },
      ]}
      multiline={multiline}
    />
  </View>
);