import React from 'react';
import { ScrollView, View } from 'react-native';
import SummaryCard from './SummaryCard';



type Props = {
  data: {
    label: string;
    value: number;
    color: string;
  }[];
};

const SummarySection = ({ data }: Props) => {
  return (
    <View
      style={{
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
      }}
    >
      {data.map((item, i) => (
        <SummaryCard key={i} item={item} />
      ))}
    </View>
  );
};

export default SummarySection;
