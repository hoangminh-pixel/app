import { PRIMARY } from "@/utils/color";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f8',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
  },

  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },

  tabItem: {
    marginRight: 20,
    paddingVertical: 10,
  },

  tabActive: {
    borderBottomWidth: 2,
    borderColor: PRIMARY,
  },

  tabText: {
    color: '#888',
  },

  tabTextActive: {
    color: PRIMARY,
    fontWeight: '700',
  },

  searchSection: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingBottom: 12
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 10,
    marginLeft: 8,
  },

  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  filterText: {
    fontSize: 12,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },

  image: {
    height: 140,
    width: '100%',
  },

  statusBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },

  cardContent: {
    padding: 16,
  },

  title: {
    fontSize: 14,
    fontWeight: '700',
  },

  code: {
    fontSize: 12,
    color: '#161616',
    marginBottom: 8,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  labelSmall: {
    fontSize: 10,
    color: '#888',
    marginBottom: 4,
  },

  managerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: PRIMARY + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },

  assignBtn: {
    marginTop: 12,
    backgroundColor: PRIMARY,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  button: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor:'#00000060',
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
});