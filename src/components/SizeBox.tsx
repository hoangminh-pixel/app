import React from 'react';
import { View } from 'react-native';

interface Props {
  width?: number;
  height?: number;
}

const SizeBox: React.FC<Props> = ({ width, height }) => {
  return <View style={{ width: width, height: height }}></View>;
};

export default SizeBox;
