import MaterialIcons from '@react-native-vector-icons/material-icons';
import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import AppText from './AppText';

type MaterialIconName = React.ComponentProps<typeof MaterialIcons>['name'];
type MaterialIconColor = React.ComponentProps<typeof MaterialIcons>['color'];

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  leadingIcon?: MaterialIconName;
  trailingIcon?: MaterialIconName;
  leadingIconColor?: MaterialIconColor;
  trailingIconColor?: MaterialIconColor;
  onPressTrailingIcon?: () => void;
  inputHeight?: number;
}

const AppInput: React.FC<Props> = ({
  label,
  error,
  leadingIcon,
  trailingIcon,
  leadingIconColor = '#888',
  trailingIconColor = '#888',
  onPressTrailingIcon,
  inputHeight = 56,
  style,
  ...rest
}) => {
  return (
    <View style={styles.inputGroup}>
      <View style={styles.passwordHeader}>
        {label && <AppText style={styles.label}>{label}</AppText>}
      </View>

      <View style={[styles.inputWrap, { height: inputHeight }]}>
        {leadingIcon && (
          <MaterialIcons
            name={leadingIcon}
            size={20}
            color={leadingIconColor}
          />
        )}

        <TextInput
          placeholder={rest.placeholder}
          placeholderTextColor={rest.placeholderTextColor}
          secureTextEntry={rest.secureTextEntry}
          style={[styles.input, style]}
          value={rest.value}
          onChangeText={rest.onChangeText}
        />
        {trailingIcon && (
          <TouchableOpacity
            onPress={() => {
              if (onPressTrailingIcon) {
                onPressTrailingIcon();
              }
            }}
          >
            <MaterialIcons
              name={trailingIcon}
              size={20}
              color={trailingIconColor}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <AppText size={12} color="#EF4444" style={{ marginTop: 4 }}>
          {error}
        </AppText>
      )}
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 56,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
});
