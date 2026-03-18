import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },

  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  name: {
    fontWeight: 'bold',
//     flex: 1,
  },

  sub: {
    fontSize: 12,
    color: '#666',
  },

  logo: {
    color: '#1337ec',
    fontWeight: 'bold',
    fontSize: 18,
  },

  titleBox: {
    alignItems: 'center',
    marginVertical: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 13,
    color: '#666',
  },

  card: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 20,
    padding: 20,
  },

  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  centerText: {
    position: 'absolute',
    alignItems: 'center',
  },

  total: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  label: {
    fontSize: 12,
    color: '#999',
  },

  legendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },

  legendItem: {
    width: '50%',
    marginBottom: 12,
  },

  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },

  legendText: {
    fontSize: 14,
    color: '#666',
  },

  legendValue: {
    fontWeight: 'bold',
  },

  percent: {
    fontSize: 12,
    color: '#aaa',
  },

  grid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },

  shortcut: {
    alignItems: 'center',
  },

  shortcutBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#e5edff',
    marginBottom: 6,
  },

  shortcutText: {
    fontSize: 12,
  },
});
