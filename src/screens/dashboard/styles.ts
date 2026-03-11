import { screenHeight } from '@/utils/appConstant';
import { PRIMARY } from '@/utils/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    top: screenHeight / 2 - 250,
    left: 20,
  },
  container: {
    backgroundColor: '#f2f2f2',
    padding: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
  },
  chartPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 120 / 8,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  chartNumber: {
    fontSize: 28,
    fontWeight: '700',
  },
  chartLabel: {
    fontSize: 10,
    color: '#777',
  },
  statList: {
    flex: 1,
    justifyContent: 'center',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statText: {
    fontSize: 14,
  },
  subText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 18,
  },
  employeeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  employeeName: {
    fontSize: 14,
    fontWeight: '500',
  },
  employeeSub: {
    fontSize: 12,
    color: '#666',
  },
  badge: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
});
