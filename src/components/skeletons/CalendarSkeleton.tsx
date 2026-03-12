import { SkeletonBlock } from '@/screens/works/detailMaintenance/components/SkeletonUI';
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

const CalendarSkeleton = () => {
  const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14];

  return (
    <View style={styles.container}>
      {/* Timeline */}
      {hours.map(hour => (
        <View key={hour} style={styles.timelineRow}>
          {/* Time column */}
          <View style={styles.timeCol}>
            <SkeletonBlock style={{ width: 36, height: 12, borderRadius: 4 }} />
          </View>

          {/* Event column */}
          <View style={styles.eventCol}>
            <View style={styles.dot} />

            <View style={styles.card}>
              <SkeletonBlock
                style={{ width: '70%', height: 16, borderRadius: 4 }}
              />
              <SkeletonBlock
                style={{
                  width: '50%',
                  height: 14,
                  borderRadius: 4,
                  marginTop: 8,
                }}
              />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default CalendarSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F8',
    marginTop: 32,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },

  datePicker: {
    padding: 16,
    backgroundColor: '#fff',
  },

  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  dayItem: {
    alignItems: 'center',
    gap: 8,
  },

  viewSwitcher: {
    flexDirection: 'row',
    gap: 24,
    padding: 16,
    backgroundColor: '#fff',
  },

  timeline: {
    padding: 16,
  },

  timelineRow: {
    flexDirection: 'row',
    marginBottom: 28,
  },

  timeCol: {
    width: 60,
    alignItems: 'flex-end',
    paddingRight: 10,
  },

  eventCol: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#E5E7EB',
    paddingLeft: 12,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D1D5DB',
    position: 'absolute',
    left: -3,
    top: 8,
  },

  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
  },

  bottomTab: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
});
