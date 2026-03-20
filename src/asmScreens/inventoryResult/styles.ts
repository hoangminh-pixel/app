import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },

  code: {
    fontSize: 10,
    fontWeight: '700',
    backgroundColor: '#f1f3f9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    color: '#666',
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ef4444',
  },

  name: {
    fontSize: 14,
    fontWeight: '700',
  },

  diffLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1337ec',
  },

  diffValue: {
    fontSize: 18,
    fontWeight: '800',
  },

  bottomRow: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 10,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ddd',
  },

  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  statusText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});

export const legendStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingVertical: 10,
    backgroundColor: '#f7f9ff',
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  label: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});
