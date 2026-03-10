import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';


export default function SearchMaterial() {
  return (
    <View style={styles.container}>
      <Icon name="search" size={22} color="#1337ec" />

      <TextInput
        placeholder="Tìm kiếm hoặc chọn vật tư..."
        style={styles.input}
        placeholderTextColor="#94a3b8"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 48,
    gap: 8,
  },

  input: {
    flex: 1,
    fontSize: 14,
  },
});