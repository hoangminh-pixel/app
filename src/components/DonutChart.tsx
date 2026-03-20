import { screenWidth } from '@/utils/appConstant';
import React from 'react';
import { ColorValue, View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

const DonutChart = ({
  size = screenWidth - 100,
  strokeWidth = (screenWidth - 100) / 5,
  data = [],
}: any) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = data.reduce((s: any, i: { value: any }) => s + i.value, 0);

  if (total === 0) return null;

  let cumulativeLength = 0;

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
          {data.map(
            (
              item: { value: number; color: ColorValue | undefined },
              index: React.Key | null | undefined,
            ) => {
              // let segmentLength;

              // if (index === data.length - 1) {
              //   segmentLength = circumference - cumulativeLength;
              // } else {
              //   segmentLength = Math.round(
              //     (item.value / total) * circumference,
              //   );
              // }

              // const segmentLength = (item.value / total) * circumference;

              const segmentLength = Math.round(
                (item.value / total) * circumference,
              );

              const circle = (
                <Circle
                  key={index}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke={item.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${segmentLength + 0.5} ${
                    circumference - segmentLength
                  }`}
                  strokeDashoffset={-cumulativeLength}
                  fill="none"
                  strokeLinecap="butt"
                />
              );

              cumulativeLength += segmentLength;
              return circle;
            },
          )}
        </G>
      </Svg>
    </View>
  );
};

export default DonutChart;
