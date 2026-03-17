// src/screens/home/index.tsx
import { setCurrentModule } from '@/redux/slices/appSlice';
import { useAppDispatch } from '@/redux/store/hooks';
import { removeCurrentModuleStorage } from '@/utils/storage';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text
        onPress={async () => {
          await removeCurrentModuleStorage();
          dispatch(setCurrentModule(null));
        }}
        style={styles.text}
      >
        Màn hình Trang chủ
      </Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
});
