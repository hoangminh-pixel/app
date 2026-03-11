import { screenHeight } from '@/utils/appConstant';
import { PRIMARY } from '@/utils/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000060',
  },
  calendarContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    top: screenHeight / 2 - 230,
    left: 30,
  },
});
