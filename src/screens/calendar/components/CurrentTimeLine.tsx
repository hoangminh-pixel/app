import React from 'react';
import { View } from 'react-native';
import moment from 'moment';
import { HOUR_HEIGHT, styles } from '../styles';

const CurrentTimeLine = () => {
  const now = moment();
  const startDay = moment().startOf('day');

  const diff = now.diff(startDay, 'minutes') / 60;

  const top = diff * HOUR_HEIGHT;

  return (
    <View style={[styles.currentLine, { top }]}>
      <View style={styles.currentDot} />
      <View style={styles.currentBar} />
    </View>
  );
};

export default React.memo(CurrentTimeLine);
