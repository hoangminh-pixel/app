import React, { useCallback, useRef } from 'react';
import {
  FlatList,
  ActivityIndicator,
  View,
  Text,
  RefreshControl,
  StyleSheet,
  ViewStyle,
} from 'react-native';

type Props<T> = {
  data: T[] | undefined;
  renderItem: any;
  keyExtractor?: (item: T, index: number) => string;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  refreshing?: boolean;
  loading?: boolean;
  hasMore?: boolean;
  ListHeaderComponent?: React.ReactElement;
  ListEmptyComponent?: React.ReactElement;
  contentContainerStyle?: ViewStyle;
  style?: ViewStyle;

  scrollEnabled?: boolean;
};

export function AppFlatList<T>({
  data,
  renderItem,
  keyExtractor,
  onRefresh,
  onLoadMore,
  refreshing = false,
  loading = false,
  hasMore = false,
  ListEmptyComponent,
  ListHeaderComponent,
  contentContainerStyle,
  style,
  scrollEnabled,
}: Props<T>) {
  const onEndReachedCalledDuringMomentum = useRef(false);

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore && !onEndReachedCalledDuringMomentum.current) {
      onLoadMore?.();
      onEndReachedCalledDuringMomentum.current = true;
    }
  }, [loading, hasMore, onLoadMore]);

  return (
    <FlatList
      style={style}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor || ((_, index) => index.toString())}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
      scrollEnabled={scrollEnabled}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.3}
      onMomentumScrollBegin={() => {
        onEndReachedCalledDuringMomentum.current = false;
      }}
      ListFooterComponent={
        loading && hasMore ? (
          <View style={styles.footer}>
            <ActivityIndicator size="small" />
          </View>
        ) : null
      }
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={
        !loading && data?.length === 0
          ? ListEmptyComponent || (
              <View style={styles.empty}>
                <Text>Không có dữ liệu</Text>
              </View>
            )
          : null
      }
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[
        contentContainerStyle,
        !loading && data?.length === 0 && { flexGrow: 1 },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 16,
  },
  empty: {
    padding: 20,
    alignItems: 'center',
  },
});
