import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import moment from 'moment';
import { HOUR_HEIGHT, styles } from '../styles';

export interface JobItem {
  id: number;
  name_related?: {
    name_related?: string;
  };
  asset_name?: {
    asset_name?: string;
  };
  execution_date?: {
    execution_date?: string;
  };
  request_actual_date?: {
    request_actual_date?: string;
  };
}

interface Props {
  item: any;
  onPress?: (item: any) => void;
}

const JobCard = ({ item, onPress }: Props) => {
  const { top, height, width, left } = item.layout;

  const columnWidth = 200;

  const start = moment(item.execution_date?.execution_date);
  const end = moment(item.request_actual_date?.request_actual_date);

  return (
    <TouchableOpacity
      onPress={() => onPress?.(item)}
      style={[
        styles.jobCard,
        {
          top,
          height: height - 6,
          width: columnWidth - 10,
          left: left * columnWidth + 5,
        },
      ]}
    >
      <Text numberOfLines={2} style={styles.jobTitle}>
        {item.name_related?.name_related}
      </Text>

      <Text style={styles.jobTime}>
        {start.format('HH:mm')} - {end.format('HH:mm')}
      </Text>

      <Text style={styles.jobAsset}>{item.asset_name?.asset_name}</Text>
    </TouchableOpacity>
  );
};
export default React.memo(JobCard);
