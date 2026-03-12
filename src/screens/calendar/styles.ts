import { StyleSheet } from 'react-native';

export const HOUR_HEIGHT = 60;
export const TIME_WIDTH = 70;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  row: {
    height: HOUR_HEIGHT,
    flexDirection: 'row',
  },
  column: {
    width: 180,
    position: 'relative',
    marginRight: 8,
  },
  timeCol: {
    width: TIME_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },

  timeText: {
    fontSize: 12,
    color: '#6B7280',
  },

  lineCol: {
    flex: 1,
    justifyContent: 'center',
  },

  line: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },

  eventsLayer: {
    position: 'absolute',
    left: 80,
    top: 0,
    bottom: 0,
  },

  // jobCard: {
  //   backgroundColor: '#E6F2FF',
  //   marginHorizontal: 6,
  //   padding: 8,
  //   borderRadius: 6,
  //   width: 120
  // },

  // jobTitle: {
  //   fontSize: 12,
  //   color: '#000',
  // },

  // eventsLayer: {
  //   position: 'absolute',
  //   left: TIME_WIDTH + 10,
  //   top: 0,
  //   height: HOUR_HEIGHT * 24,
  //   marginRight: TIME_WIDTH,
  // },

  // jobCard: {
  //   // position: 'absolute',
  //   padding: 8,
  //   borderRadius: 6,
  //   width: 120,

  //   backgroundColor: '#E8F0FE',
  //   borderWidth: 1,
  //   borderColor: '#B6CCFE',
  // },
  // eventsLayer: {
  //   position: 'relative',
  // },
  // jobTitle: {
  //   fontSize: 13,
  //   fontWeight: '600',
  //   color: '#111827',
  // },

  jobTime: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 4,
  },

  jobAsset: {
    fontSize: 11,
    color: '#374151',
  },

  currentLine: {
    position: 'absolute',
    left: TIME_WIDTH,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },

  currentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginLeft: -4,
  },

  currentBar: {
    flex: 1,
    height: 2,
    backgroundColor: '#EF4444',
  },
  overlay: {
    flex: 1,
    backgroundColor: '#00000060',
  },
  calendarContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },

  jobCard: {
    backgroundColor: '#E8F2FF',
    marginHorizontal: 12,
    padding: 8,
    borderRadius: 6,
    width: 200,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },

  jobContent: {
    flex: 1,
    // justifyContent: 'space-between',
  },

  jobTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111',
  },

  // jobTime: {
  //   fontSize: 11,
  //   color: '#444',
  //   marginTop: 4,
  // },

  // jobAsset: {
  //   fontSize: 11,
  //   color: '#666',
  //   marginTop: 4,
  // },
});
