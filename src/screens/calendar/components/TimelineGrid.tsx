import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

interface Props {
  hours: number[];
}

const TimelineGrid = ({ hours }: Props) => {
  return (
    <>
      {hours.map(hour => (
        <View key={hour} style={styles.row}>
          <View style={styles.timeCol}>
            <Text style={styles.timeText}>{hour}:00</Text>
          </View>

          <View style={styles.lineCol}>
            <View style={styles.line} />
          </View>
        </View>
      ))}
    </>
  );
};

export default React.memo(TimelineGrid);
