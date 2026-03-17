import { PRIMARY } from '@/utils/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f8',
  },

  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },

  card: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 10,
    padding: 16,
  },

  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },

  sectionTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: PRIMARY,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  infoLabel: {
    color: '#64748b',
    fontSize: 13,
  },

  infoValue: {
    fontWeight: '600',
    maxWidth: '60%',
    textAlign: 'right',
  },

  inputSection: {
    paddingHorizontal: 16,
  },

  label: {
    fontWeight: '600',
    marginBottom: 6,
  },

  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
  },

  textArea: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
  },

  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
  },

  listTitle: {
    fontWeight: '700',
    fontSize: 18,
  },

  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  addText: {
    color: PRIMARY,
    fontWeight: '600',
  },

  assetCard: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 10,
  },

  removeBtn: {
    position: 'absolute',
    right: 12,
    top: 12,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },

  locationLabel: {
    fontSize: 10,
    color: '#888',
  },

  locationValue: {
    fontWeight: '700',
  },

  grid: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    gap: 16,
  },

  blockLabel: {
    fontSize: 11,
    color: '#888',
  },

  blockValue: {
    fontSize: 14,
    marginTop: 2,
  },

  smallInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 4,
    width: 60,
  },

  reasonBreak: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginTop: 4,
    // width: 60,
  },

  submitBtn: {
    margin: 16,
    backgroundColor: PRIMARY,
    borderRadius: 10,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },

  submitText: {
    color: 'white',
    fontWeight: '700',
  },
});
