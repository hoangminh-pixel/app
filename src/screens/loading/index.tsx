import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import { useAppSelector } from '@/redux/store/hooks';
import { AppText } from '@/components';
import { PRIMARY } from '@/utils/color';
import { ModalView } from 'react-native-multiple-modals';

const GlobalLoading = () => {
  const { loading, loadingMessage } = useAppSelector(state => state.loading);

  if (!loading) return null;

  return (
    <ModalView
      statusBar={{ translucent: true, barStyle: 'dark-content' }}
      backdropColor="rgba(126, 125, 125, 0.5)"
      contentContainerStyle={{
        width: '100%',
      }}
    >
      <View style={styles.overlay}>
        <View>
          <ActivityIndicator size="large" color={PRIMARY} />
          {loadingMessage && (
            <AppText style={{ marginTop: 12 }}>{loadingMessage}</AppText>
          )}
        </View>
      </View>
    </ModalView>
  );
};

export default GlobalLoading;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
