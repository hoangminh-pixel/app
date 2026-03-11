import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

const weekDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

type Props = {
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
  initialDate?: Date;
};

const generateCalendar = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startWeekDay = (firstDay.getDay() + 6) % 7; // convert Sun=0 to Mon=0
  const totalDays = lastDay.getDate();

  const days: { date: Date; currentMonth: boolean }[] = [];

  // previous month filler
  for (let i = 0; i < startWeekDay; i++) {
    const d = new Date(year, month, -startWeekDay + i + 1);
    days.push({ date: d, currentMonth: false });
  }

  // current month
  for (let i = 1; i <= totalDays; i++) {
    days.push({ date: new Date(year, month, i), currentMonth: true });
  }

  // next month filler (đủ 42 ô)
  while (days.length % 7 !== 0) {
    const d = new Date(
      year,
      month + 1,
      days.length - totalDays - startWeekDay + 1,
    );
    days.push({ date: d, currentMonth: false });
  }

  return days;
};

export default function CustomCalendar({ selectedDate, onSelect, initialDate }: Props) {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    initialDate ?? selectedDate ?? today,
  );

  const days = useMemo(() => generateCalendar(currentDate), [currentDate]);

  const changeMonth = (delta: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + delta,
      1,
    );
    setCurrentDate(newDate);
  };

  const renderItem = ({ item }: any) => {
    const isSelected =
      selectedDate && item.date.toDateString() === selectedDate.toDateString();

    const isToday = item.date.toDateString() === new Date().toDateString();

    return (
      <TouchableOpacity
        style={[styles.dayContainer, isSelected && styles.selected]}
        onPress={() => onSelect(item.date)}
      >
        <Text
          style={[
            styles.dayText,
            !item.currentMonth && styles.otherMonth,
            isToday && styles.today,
          ]}
        >
          {item.date.getDate()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Text style={styles.nav}>{'<'}</Text>
        </TouchableOpacity>

        <Text style={styles.month}>
          {currentDate.toLocaleString('vi-VN', { month: 'long' })}{' '}
          {currentDate.getFullYear()}
        </Text>

        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Text style={styles.nav}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Week days */}
      <View style={styles.weekRow}>
        {weekDays.map(day => (
          <Text key={day} style={styles.weekDay}>
            {day}
          </Text>
        ))}
      </View>

      {/* Days grid */}
      <FlatList
        data={days}
        renderItem={renderItem}
        keyExtractor={(_, i) => i.toString()}
        numColumns={7}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: 320,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  nav: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  month: {
    fontSize: 18,
    fontWeight: '600',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weekDay: {
    width: '14.28%',
    textAlign: 'center',
    fontWeight: '500',
  },
  dayContainer: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 14,
  },
  otherMonth: {
    color: '#aaa',
  },
  selected: {
    backgroundColor: '#4A90E2',
    borderRadius: 20,
  },
  today: {
    color: 'red',
    fontWeight: 'bold',
  },
});
