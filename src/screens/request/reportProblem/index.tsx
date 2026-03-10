import { AppFlatList } from '@/components/AppFlatList';
import SizeBox from '@/components/SizeBox';
import { getSateColor, getSateItem } from '@/utils/stateWork';
import Icon from '@react-native-vector-icons/material-icons';
import moment from 'moment';
import React from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { RootRequest } from '../types';
import useRepairRequest from './hooks/useReportProblem';
import { styles } from './styles';
import FabMenu from '@/components/FAB';

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Khẩn cấp':
      return '#ef4444';
    case 'Cao':
      return '#ef4444';
    case 'Trung bình':
      return '#3b82f6';
    default:
      return '#9ca3af';
  }
};

export default function ReportProblemScreen() {
  const {
    listRequest,
    loading,
    refreshing,
    handleRefresh,
    handleLoadMore,
    hasMore,
    navigation,
    handleReloadwhenBack,
  } = useRepairRequest();

  return (
    <View style={styles.container}>
      <AppFlatList
        data={listRequest}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }: { item: RootRequest }) => (
          <Pressable
            onPress={() => {
              if (
                item.state.state === 'draft' ||
                item.state.state === 'waiting' ||
                item.state.state === 'Trạng thái không hợp lệ'
              ) {
                navigation.navigate('CreateRepairRequestScreen', {
                  id: item.id,
                  onGoBack: handleReloadwhenBack,
                  state: item.state.state,
                });
                return;
              }
              navigation.navigate('DetailRequestScreen', {
                id: item.id,
                onGoBack: handleReloadwhenBack,
              });
            }}
          >
            <RequestCard item={item} />
          </Pressable>
        )}
        contentContainerStyle={{ padding: 16 }}
        onRefresh={handleRefresh}
        onLoadMore={handleLoadMore}
        loading={loading}
        refreshing={refreshing}
        hasMore={hasMore}
      />

      <FabMenu
        onNavigateCreateRepair={() => {
          navigation.navigate('CreateRepairRequestScreen', {
            id: -1,
            onGoBack: async () => {},
          });
        }}
        onNavigateCreateIssue={() => {
          navigation.navigate('CreateReportProbemScreen', {
            id: -1,
            onGoBack: handleReloadwhenBack,
          });
        }}
      />
    </View>
  );
}

const RequestCard = ({ item }: { item: RootRequest }) => {
  const file = item.list_image_request?.list_image_request?.[0];
  const url = file?.image_url || '';
  const isVideo = /\.(mp4|mov|avi|m4v)$/i.test(url);
  return (
    <View style={styles.card}>
      <View>
        {item.list_image_request.list_image_request &&
        item.list_image_request.list_image_request.length > 0 &&
        !isVideo ? (
          <Image
            source={{
              uri: item.list_image_request.list_image_request[0].image_url,
            }}
            style={styles.image}
          />
        ) : (
          <>{item?.priority?.priority && <SizeBox height={35} />}</>
        )}

        {item?.priority?.priority && (
          <View
            style={[
              styles.priorityBadge,
              { backgroundColor: getPriorityColor(item?.priority?.priority) },
            ]}
          >
            <Text style={styles.priorityText}>{item?.priority?.priority}</Text>
          </View>
        )}
      </View>

      <View style={styles.cardContent}>
        <View style={styles.rowBetween}>
          <Text style={styles.title}>{item?.asset_name?.asset_name}</Text>
          <Text style={styles.code}>{item?.name?.name}</Text>
        </View>

        <InfoRow icon="settings" label="Hệ thống" value={item?.cause?.cause} />
        <InfoRow
          icon="person"
          label="Người tạo"
          value={item?.request_employee_id?.request_employee_id}
        />
        <InfoRow
          icon="calendar-today"
          label="Ngày"
          value={moment(item?.execution_date?.execution_date).format(
            'HH:mm DD/MM/YYYY',
          )}
        />

        <View style={styles.infoRow}>
          <Icon name="info" size={16} color="#6b7280" />
          <Text style={styles.infoText}>
            Trạng thái:{' '}
            <Text
              style={{
                color: getSateColor({
                  state: item?.state?.state ?? '',
                }),
                fontWeight: '700',
              }}
            >
              {getSateItem({ state: item?.state?.state })}
            </Text>
          </Text>
        </View>

        <Pressable style={styles.detailBtn}>
          <Text style={styles.detailText}>Xem chi tiết</Text>
        </Pressable>
      </View>
    </View>
  );
};

const InfoRow = ({ icon, value }: any) => (
  <View style={styles.infoRow}>
    <Icon name={icon} size={16} color="#6b7280" />
    <Text style={styles.infoText}>
      <Text style={styles.bold}>{value ?? 'Không xác định'}</Text>
    </Text>
  </View>
);
