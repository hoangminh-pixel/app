import React, { Fragment } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from './AppHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

interface Props {
  children: React.ReactNode;
  title?: string;
  paddingHorizontal?: number;
  actions?: React.ReactNode;
  centerComponent?: React.ReactNode;
  scrollable?: boolean;
  containerStyle?: ViewStyle;
  showBack?: boolean;
}

const BasePage: React.FC<Props> = ({
  children,
  title,
  paddingHorizontal = 16,
  actions,
  centerComponent,
  scrollable = false,
  containerStyle,
  showBack,
}) => {
  const ContentWrapper = scrollable ? KeyboardAwareScrollView : View;

  return (
    <SafeAreaView style={[styles.container, containerStyle]} edges={[]}>
      {(title || centerComponent) && (
        <Fragment>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle={'dark-content'}
          />
          <AppHeader
            title={title}
            actions={actions}
            centerComponent={centerComponent}
            showBack={showBack}
          />
        </Fragment>
      )}

      <ContentWrapper
        style={[styles.flex, { paddingHorizontal }]}
        contentContainerStyle={scrollable ? { flexGrow: 1 } : undefined}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bottomOffset={30}
      >
        {children}
      </ContentWrapper>
    </SafeAreaView>
  );
};

export default BasePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  flex: {
    flex: 1,
  },
});
