import { PRIMARY } from "@/utils/color";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f6f8' },

  header: {
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },

  headerTitle: { fontSize: 18, fontWeight: '700' },

  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
  },

  image: { width: '100%', height: 180 },

  priorityBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  priorityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },

  cardContent: { padding: 16 },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  title: { fontSize: 16, fontWeight: '700', flex: 1 },

  code: { fontSize: 12, color: '#6b7280' },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },

  infoText: { fontSize: 13, color: '#374151' },

  bold: { fontWeight: '600' },

  detailBtn: {
    marginTop: 12,
    backgroundColor: PRIMARY,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  detailText: { color: 'white', fontWeight: '600' },

  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    backgroundColor: '#10b981',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#eee',
  },

  navItem: { alignItems: 'center' },

  navText: { fontSize: 10, marginTop: 2 },
});