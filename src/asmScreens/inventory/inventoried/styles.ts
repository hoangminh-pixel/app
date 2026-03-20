import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  searchRow: {
    flexDirection: 'row',
    padding: 16,
  },

  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  input: {
    flex: 1,
    marginLeft: 6,
    height: 40,
  },

  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginLeft: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
