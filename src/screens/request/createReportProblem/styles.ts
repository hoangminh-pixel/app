import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },

  header: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  headerTitle: { fontSize: 18, fontWeight: '700' },

  content: { paddingVertical: 16 },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },

  sectionTitle: {
    marginLeft: 6,
    fontWeight: '600',
    color: '#666',
    fontSize: 14,
  },

  label: { fontSize: 14, marginBottom: 6, color: '#444' },

  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
  },

  row: { flexDirection: 'row', gap: 12 },

  mapBox: {
    height: 120,
    backgroundColor: '#e5e7eb',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
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

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
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
    padding: 16,
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
  userCard: {
    backgroundColor: '#e6f4ee',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#005a3c',
    justifyContent: 'center',
    alignItems: 'center',
  },

  userName: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  userInfo: {
    fontSize: 12,
    color: '#555',
  },
   imageChecklist: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
    // overflow: 'hidden',
  },
});
