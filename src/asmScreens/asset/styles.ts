import { PRIMARY } from "@/utils/color";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f8',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    backgroundColor: 'rgba(19,55,236,0.1)',
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
  },

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

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  codeTag: {
    backgroundColor: 'rgba(19,55,236,0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },

  codeText: {
    fontSize: 10,
    color: PRIMARY,
    fontWeight: '700',
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'green',
    marginRight: 4,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },

  label: {
    fontSize: 11,
    color: '#777',
  },

  value: {
    fontSize: 14,
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,

    elevation: 2,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },

  code: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1337ec',
    backgroundColor: 'rgba(19,55,236,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    textTransform: 'uppercase',
  },

  status: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },

  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },

  assetName: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 8,
  },

  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 10,
  },

  infoLabel: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
  },

  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
});
