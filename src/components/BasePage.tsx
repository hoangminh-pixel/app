import React, { Fragment } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { Edges, SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from './AppHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { PRIMARY } from '@/utils/color';

interface Props {
  children: React.ReactNode;
  title?: string;
  paddingHorizontal?: number;
  actions?: React.ReactNode;
  centerComponent?: React.ReactNode;
  scrollable?: boolean;
  containerStyle?: ViewStyle;
  showBack?: boolean;
  keyboardShouldPersistTaps?:
    | boolean
    | 'always'
    | 'never'
    | 'handled'
    | undefined;
  edges?: Edges | undefined;
  refreshing?: boolean;
  onRefresh?: () => void;
  bottomOffset?: number;
  onBackPress?: () => void;
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
  keyboardShouldPersistTaps = 'handled',
  edges = [],
  refreshing,
  onRefresh,
  bottomOffset = 30,
  onBackPress
}) => {
  const ContentWrapper = scrollable ? KeyboardAwareScrollView : View;

  return (
    <SafeAreaView style={[styles.container, containerStyle]} edges={edges}>
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
            onBackPress={onBackPress}
          />
        </Fragment>
      )}

      <ContentWrapper
        style={[styles.flex, { paddingHorizontal }]}
        contentContainerStyle={scrollable ? { flexGrow: 1 } : undefined}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        showsVerticalScrollIndicator={false}
        bottomOffset={bottomOffset}
        refreshControl={
          scrollable && onRefresh ? (
            <RefreshControl
              colors={[PRIMARY]}
              tintColor={PRIMARY}
              refreshing={refreshing ?? false}
              onRefresh={onRefresh}
            />
          ) : undefined
        }
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
