import { PRIMARY } from "@/utils/color";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#064e3b',
  },
  section: {
    paddingVertical: 16,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    //SHADOW
    shadowColor: PRIMARY,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#22c55e',
  },
  welcome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 13,
    color: '#64748b',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#94a3b8',
    marginBottom: 12,
  },
  statusGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusCard: {
    backgroundColor: 'white',
    flex: 1,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: PRIMARY,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statusNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  statusLabel: {
    fontSize: 10,
    color: '#64748b',
    textAlign: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewAll: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#064e3b',
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: PRIMARY,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskLocation: {
    fontSize: 12,
    color: '#64748b',
  },
  statusBadge: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  taskTime: {
    fontSize: 10,
    color: '#94a3b8',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  homeButton: {
    backgroundColor: '#064e3b',
    padding: 16,
    borderRadius: 40,
  },
});