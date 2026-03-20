import { AppInput } from '@/components';
import CustomCalendar from '@/components/CalendartCutom';
import SizeBox from '@/components/SizeBox';
import { PRIMARY } from '@/utils/color';
import Icon from '@react-native-vector-icons/material-icons';
import moment from 'moment';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

interface Props {
  visible: boolean;
  onClose: () => void;
  onApply: (data: { fromDate: Date; toDate: Date }) => void;
  fromDate: Date;
  endDate: Date;
  setFromDate: any;
  setEndDate: any;
}

export default function BottomSheetFilterDate({
  visible,
  onClose,
  onApply,
  fromDate,
  endDate,
  setFromDate,
  setEndDate,
}: Props) {
  const [visibleCalendarStart, setvisibleCalendarStart] = useState(false);
  const [visibleCalendarEnd, setvisibleCalendarEnd] = useState(false);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <Pressable style={styles.overlay} onPress={onClose} />
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.sheet}>
            <View style={styles.handle} />

            <View style={styles.header}>
              <Text style={styles.title}>Lọc theo ngày tháng</Text>

              <Pressable style={styles.closeBtn} onPress={onClose}>
                <Icon name="close" size={20} color="#444" />
              </Pressable>
            </View>

            <View style={styles.form}>
              <View style={styles.field}>
                <Text style={styles.label}>Từ ngày</Text>

                <Pressable
                  style={styles.inputBox}
                  onPress={() => setvisibleCalendarStart(true)}
                >
                  <Text style={fromDate ? styles.value : styles.placeholder}>
                    {moment(fromDate).format('DD/MM/YYYY')}
                  </Text>

                  <Icon name="calendar-month" size={18} color={PRIMARY} />
                </Pressable>
              </View>

              {/* TO DATE */}
              <View style={styles.field}>
                <Text style={styles.label}>Đến ngày</Text>

                <Pressable
                  style={styles.inputBox}
                  onPress={() => setvisibleCalendarEnd(true)}
                >
                  <Text style={endDate ? styles.value : styles.placeholder}>
                    {moment(endDate).format('DD/MM/YYYY')}
                  </Text>

                  <Icon name="calendar-month" size={18} color={PRIMARY} />
                </Pressable>
              </View>
            </View>

            {/* actions */}
            <View style={styles.actions}>
              {/* <Pressable
                style={styles.resetBtn}
                //   onPress={handleReset}
                onPress={() => setvisibleCalendarStart(true)}
              >
                <Text style={styles.resetText}>Bỏ lọc</Text>
              </Pressable> */}

              <Pressable
                style={styles.applyBtn}
                onPress={() => {
                  onApply({
                    fromDate: fromDate,
                    toDate: endDate,
                  });
                  onClose();
                }}
              >
                <Text style={styles.applyText}>Tìm kiếm</Text>
              </Pressable>
            </View>
            <SizeBox height={48}/>
          </View>
        </KeyboardAvoidingView>

        <Modal transparent visible={visibleCalendarStart}>
          <View style={styles.overlay}>
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={() => setvisibleCalendarStart(false)}
            />

            <View style={styles.centerWrapper}>
              <View style={styles.calendarContainer}>
                <CustomCalendar
                  selectedDate={fromDate}
                  onSelect={(date: Date) => {
                    setFromDate(date);
                    setvisibleCalendarStart(false);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>

        <Modal transparent visible={visibleCalendarEnd}>
          <View style={styles.overlay}>
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={() => setvisibleCalendarEnd(false)}
            />

            <View style={styles.centerWrapper}>
              <View style={styles.calendarContainer}>
                <CustomCalendar
                  selectedDate={endDate}
                  onSelect={(date: Date) => {
                    setEndDate(date);
                    setvisibleCalendarEnd(false);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },

  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 20,
  },

  handle: {
    alignSelf: 'center',
    width: 50,
    height: 5,
    borderRadius: 10,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
  },

  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  form: {
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 20,
  },

  quick: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  quickLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
    marginBottom: 8,
  },

  quickRow: {
    flexDirection: 'row',
    gap: 8,
  },

  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#f1f5f9',
  },

  chipActive: {
    backgroundColor: '#c7d2fe',
  },

  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },

  chipTextActive: {
    color: '#1d4ed8',
  },

  actions: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
  },

  resetBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
  },

  resetText: {
    fontWeight: '700',
    color: '#555',
  },

  applyBtn: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: PRIMARY,
    alignItems: 'center',
  },

  applyText: {
    color: '#fff',
    fontWeight: '700',
  },

  centerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 10,

    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  field: {
    marginBottom: 12,
  },

  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
    marginBottom: 6,
    textTransform: 'uppercase',
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,

    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  value: {
    fontSize: 14,
    color: '#0f172a',
    fontWeight: '500',
  },

  placeholder: {
    fontSize: 14,
    color: '#94a3b8',
  },
});
