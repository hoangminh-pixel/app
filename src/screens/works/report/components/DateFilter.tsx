import { PRIMARY } from '@/utils/color';
import Icon from '@react-native-vector-icons/material-icons';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

type Props = {
  startDate: string;
  endDate: string;
  onClickStartDate: () => void;
  onClickEndDate: () => void;
  onSearch: () => void;
};

const DateFilter = ({
  startDate,
  endDate,
  onClickEndDate,
  onClickStartDate,
  onSearch,
}: Props) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.input} onPress={onClickStartDate}>
        <Text>{startDate}</Text>
        <Icon name="calendar-today" size={18} color="#94A3B8" />
      </Pressable>

      <Pressable style={styles.input} onPress={onClickEndDate}>
        <Text>{endDate}</Text>
        <Icon name="calendar-today" size={18} color="#94A3B8" />
      </Pressable>

      <TouchableOpacity style={styles.searchBtn} onPress={onSearch}>
        <Icon name="search" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default DateFilter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchBtn: {
    width: 48,
    height: 48,
    backgroundColor: PRIMARY,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
