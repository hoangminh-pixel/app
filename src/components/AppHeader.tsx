import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { PRIMARY } from '@/utils/color';
import AppText from './AppText';

interface Props {
  title?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  actions?: React.ReactNode;
  centerComponent?: React.ReactNode;
}

const AppHeader: React.FC<Props> = ({
  title,
  showBack = false,
  onBackPress,
  actions,
  centerComponent,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.inner}>
        <View style={styles.side}>
          {showBack && (
            <TouchableOpacity onPress={handleBack}>
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>

        {centerComponent && <View style={styles.centerComponent}>{centerComponent}</View>}

        {title && (
          <AppText style={styles.title} numberOfLines={1}>
            {title}
          </AppText>
        )}

        <View style={styles.side}>{actions}</View>
      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: PRIMARY,
  },
  inner: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  side: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  centerComponent: {
    flex: 1,
    alignItems: 'center',
  },
});
