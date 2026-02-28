import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import AppText from './AppText';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { PRIMARY } from '@/utils/color';

type Variant = 'primary' | 'outline' | 'danger';
type MaterialIconName = React.ComponentProps<typeof MaterialIcons>['name'];

interface Props {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: Variant;
  style?: ViewStyle;
  buttonTextColor?: string;
  buttonIcon?: MaterialIconName;
}

const AppButton: React.FC<Props> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  style,
  buttonTextColor = '#fff',
  buttonIcon,
}) => {
  const scheme = useColorScheme();

  const getStyle = (): ViewStyle => {
    switch (variant) {
      case 'outline':
        return {
          borderWidth: 1,
          borderColor: PRIMARY,
          backgroundColor: 'transparent',
        };
      case 'danger':
        return {
          backgroundColor: '#EF4444',
        };
      default:
        return {
          backgroundColor: PRIMARY,
        };
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        getStyle(),
        disabled && { opacity: 0.5 },
        pressed && { opacity: 0.8 },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <View style={styles.button}>
          <AppText color={buttonTextColor} style={styles.buttonText}>
            {title}
          </AppText>
          {buttonIcon && (
            <MaterialIcons name={buttonIcon} size={20} color="#fff" />
          )}
        </View>
      )}
    </Pressable>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    // height: 56,
    // backgroundColor: PRIMARY,
    // borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    // marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
