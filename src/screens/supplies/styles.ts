import { PRIMARY } from '@/utils/color';
import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  title: {
    fontWeight: '700',
    fontSize: 13,
    color: '#64748b',
  },

  badge: {
    backgroundColor: '#1337ec20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },

  badgeText: {
    color: '#1337ec',
    fontWeight: '700',
    fontSize: 12,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 14,
    marginBottom: 10,
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#e2e8f0',
    marginRight: 12,
  },

  name: {
    fontWeight: '700',
    fontSize: 15,
  },

  unit: {
    fontSize: 12,
    color: '#64748b',
  },

  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    paddingHorizontal: 8,
    gap: 10,
  },

  qty: {
    fontWeight: '700',
  },

  footer: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 20 : 30,
    left: 8,
    right: 8,
  },

  submitBtn: {
    backgroundColor: PRIMARY,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },

  submitText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
