import { PRIMARY } from '@/utils/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9ff',
  },

  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },

  iconBtn: {
    padding: 6,
  },

  content: {
    padding: 16,
    paddingBottom: 120,
  },

  tabs: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  tabActive: {
    fontSize: 12,
    fontWeight: '700',
    color: PRIMARY,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderColor: PRIMARY,
  },

  tab: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
    paddingBottom: 8,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#1337ec10',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardTitle: {
    fontWeight: '600',
    fontSize: 14,
  },

  cardSubtitle: {
    fontSize: 11,
    color: '#777',
  },

  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  value: {
    fontSize: 18,
    fontWeight: '800',
  },

  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ff000020',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderBottomLeftRadius: 10,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: 'red',
  },

  summary: {
    marginTop: 24,
    backgroundColor: '#f1f3f9',
    borderRadius: 16,
    padding: 20,
    overflow: 'hidden',
  },

  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },

  summaryText: {
    fontSize: 13,
    color: '#666',
    width: '80%',
  },

  summaryIcon: {
    position: 'absolute',
    right: -10,
    bottom: -10,
  },

  button: {
    marginTop: 24,
    height: 56,
    borderRadius: 12,
    backgroundColor: PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 1,
  },
});
