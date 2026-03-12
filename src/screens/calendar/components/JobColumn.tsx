import React from 'react';
import { View } from 'react-native';
import JobCard, { JobItem } from './JobCard';
import { styles } from '../styles';

interface Props {
  jobs: JobItem[];
  onPressJob?: (job: JobItem) => void;
}

const JobColumn = ({ jobs, onPressJob }: Props) => {
  return (
    <View style={styles.column}>
      {jobs.map(job => (
        <JobCard key={job.id} item={job} onPress={onPressJob} />
      ))}
    </View>
  );
};

export default React.memo(JobColumn);
