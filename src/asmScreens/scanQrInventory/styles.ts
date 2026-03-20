import { screenWidth } from '@/utils/appConstant';
import { StyleSheet } from 'react-native';

const BOX_SIZE = screenWidth * 0.6;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 10,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 16,
    paddingVertical: 12,

    backgroundColor: 'rgba(255,255,255,0.9)',
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },

  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },

  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  scanWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  scanBox: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    position: 'relative',
  },

  innerBorder: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },

  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#fff',
  },

  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 12,
  },

  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 12,
  },

  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 12,
  },

  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 12,
  },

  manualWrapper: {
    position: 'absolute',
    bottom: 140,
    alignItems: 'center',
  },

  manualBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,

    paddingHorizontal: 16,
    paddingVertical: 10,

    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },

  manualText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },

  bottomWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },

  bottomBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,

    paddingVertical: 14,
    paddingHorizontal: 20,

    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },

  bottomText: {
    color: '#fff',
    fontWeight: '600',
  },
});
