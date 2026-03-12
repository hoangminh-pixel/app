import React from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import moment from 'moment';
import { HOUR_HEIGHT, styles } from '../styles';

const JobsLayer = ({ jobs, onPressJob }: any) => {
  const getPosition = (job: any) => {
    const start = moment(job.execution_date?.execution_date);
    const end = moment(job.request_actual_date?.request_actual_date);

    const startDay = moment(start).startOf('day');

    const diffStart = start.diff(startDay, 'minutes') / 60;
    const diffEnd = end.diff(startDay, 'minutes') / 60;
    const HEIGHT_SCALE = 0.2;
    const MIN_HEIGHT = 100;
    return {
      top: diffStart * HOUR_HEIGHT + 20,
      height: Math.max(
        MIN_HEIGHT,
        (diffEnd - diffStart) * HOUR_HEIGHT * HEIGHT_SCALE,
      ),
      start,
      end,
    };
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.eventsLayer, { marginRight: 100 }]}
    >
      {jobs.map((job: any) => {
        const { top, height, start, end } = getPosition(job);
        return (
          <TouchableOpacity
            key={job.id}
            onPress={() => onPressJob?.(job)}
            style={[
              styles.jobCard,
              {
                marginTop: top,
                height : 200,
              },
            ]}
          >
            <View style={styles.jobContent}>
              <Text style={styles.jobTitle} numberOfLines={2}>
                {job.name_related?.name_related}
              </Text>

              <Text style={styles.jobTime}>
                {start.format('HH:mm')} - {end.format('HH:mm')}
              </Text>

              {job.asset_name?.asset_name && (
                <Text style={styles.jobAsset} numberOfLines={3}>
                  {job.asset_name.asset_name}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default React.memo(JobsLayer);
