import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f8',
  },

  header: {
    height: 56,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  headerIcon: {
    fontSize: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
  },

  image: {
    width: '100%',
    height: 180,
  },

  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  badge: {
    backgroundColor: '#e8ecff',
    color: '#1337ec',
    fontWeight: '700',
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },

  subBadge: {
    fontSize: 12,
    color: '#777',
  },

  assetTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 4,
  },

  section: {
    paddingHorizontal: 16,
  },

  sectionCard: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  viewAll: {
    color: '#1337ec',
    fontSize: 12,
    fontWeight: '600',
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  infoLabel: {
    color: '#777',
    fontSize: 14,
  },

  infoValue: {
    fontWeight: '600',
  },

  highlight: {
    color: '#1337ec',
    fontWeight: '700',
  },

  usageCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  qty: {
    fontSize: 12,
    color: '#777',
  },

  location: {
    fontWeight: '700',
    fontSize: 14,
  },

  status: {
    fontSize: 10,
    backgroundColor: '#eee',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: '700',
    alignSelf: 'center',
  },

  usageInfo: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },

  usageText: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },

  bottomNav: {
    height: 70,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#eee',
  },

  navItem: {
    alignItems: 'center',
  },

  navIcon: {
    fontSize: 16,
    color: '#999',
  },

  navText: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },

  activeNav: {
    color: '#1337ec',
  },
});
