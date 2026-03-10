import { PRIMARY } from '@/utils/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  section: {
    marginBottom: 8,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statusBadge: {
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },

  statusText: {
    fontSize: 10,
    fontWeight: '700',
    // color: PRIMARY,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 4,
  },

  code: {
    fontSize: 12,
    color: '#666',
  },

  primaryButton: {
    backgroundColor: PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    height: 40,
  },

  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },

  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#e0e7ff',
    borderRadius: 8,
  },

  techBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  techItem: {
    width: '48%',
    marginBottom: 12,
  },

  techLabel: {
    fontSize: 11,
    color: '#666',
    textTransform: 'uppercase',
  },

  techValue: {
    fontSize: 14,
    fontWeight: '600',
  },

  personCard: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 12,
    // flex: 1,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },

  attachmentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    borderRadius: 12,
    marginBottom: 12,
  },

  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  image: {
    width: '31%',
    height: 90,
    borderRadius: 8,
  },

  addImageBox: {
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardSupplies: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9', // slate-100
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    padding: 8,
  },
  imageGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  addBox: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageWrapper: {
    width: 80,
    height: 80,
  },

  imageChecklist: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
    // overflow: 'hidden',
  },

  removeBtn: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  },

  submitBtn: {
    backgroundColor: '#005a3c',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },

  submitText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 6,
  },
});
