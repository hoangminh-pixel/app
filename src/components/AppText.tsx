import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';

interface Props extends TextProps {
  size?: number;
  color?: string;
  style?: TextStyle;
}

const AppText: React.FC<Props> = ({
  children,
  size = 14,
  color,
  style,
  ...rest
}) => {
  return (
    <Text
      {...rest}
      style={[
        {
          fontSize: size,
          color: color,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default AppText;
