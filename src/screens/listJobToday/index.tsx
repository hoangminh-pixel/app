import { AppInput, AppText } from '@/components';
import BasePage from '@/components/BasePage';
import Icon from '@react-native-vector-icons/material-icons';
import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';

import HomeSkeleton from '@/components/skeletons/HomeSkeleton';
import { AppFlatList } from '@/components/AppFlatList';
import { styles } from './styles';
import SizeBox from '@/components/SizeBox';
import { JobCard } from '../works/maintenance/components/JobCard';
import useListJobToday from './hooks/useListJobToday';
import { Detail } from '@/services/workRepair';
import AssignWorkModal from '../works/maintenance/components/AssignWorkModal';
import { ModalMultiDropdown } from '@/components/DropDownMulti';
import JobListSkeleton from '@/components/skeletons/ListJobSkeleton';

const ListJobTodayScreen = () => {
  const {
    search,
    setSearch,
    navigation,
    handleRefresh,
    handleLoadMore,
    loading,
    refreshing,
    hasMore,
    dataMaintanence,
    visibleAssignWorkModal,
    setVisibleAssignWorkModal,
    dataDetailJob,
    checkEmployee,
    setCheckEmployee,
    technicians,
    setTechnicians,
    techniciansWorkToo,
    setCheckEmployeeWorkToo,
    handleCloseModal,
    handleAssignWorkInModal,
    handleAssignWork,
    deviceModal,
    visibleModalFilter,
    setVisibleModalFilter,
    deviceModalSelect,
    setDeviceModalSelect,
    dataMaintanenceFilter,
    showSkeleton,
  } = useListJobToday();

  return (
    <BasePage
      title="Công việc trong ngày"
      edges={['bottom']}
      paddingHorizontal={0}
      showBack
    >
      <View style={styles.searchSection}>
        <SizeBox height={8} />
        <AppInput
          value={search}
          onChangeText={setSearch}
          inputHeight={50}
          leadingIcon="search"
          placeholder="Tìm mã công việc, thiết bị..."
          placeholderTextColor="#999"
          trailingIcon={'tune'}
          onPressTrailingIcon={() => setVisibleModalFilter(true)}
        />
      </View>

      {showSkeleton ? (
        <JobListSkeleton />
      ) : (
        <AppFlatList
          data={dataMaintanenceFilter}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }: { item: Detail }) => (
            <Pressable
              onPress={() => {
                navigation.navigate('DetailRepairScreen', {
                  id: item.id,
                  onGoBack: () => {},
                });
              }}
            >
              <JobCard item={item} onPressAssignWork={handleAssignWork} />
            </Pressable>
          )}
          contentContainerStyle={{ padding: 16 }}
          onRefresh={handleRefresh}
          onLoadMore={handleLoadMore}
          loading={loading}
          refreshing={refreshing}
          hasMore={hasMore}
        />
      )}

      <AssignWorkModal
        isVisible={visibleAssignWorkModal}
        onAssign={() => {}}
        onCloseModal={() => setVisibleAssignWorkModal(false)}
        dataItem={dataDetailJob}
        checkEmployee={checkEmployee}
        setCheckEmployee={setCheckEmployee}
        technicians={technicians}
        setTechnicians={setTechnicians}
        techniciansWorkToo={techniciansWorkToo}
        setCheckEmployeeWorkToo={setCheckEmployeeWorkToo}
        handleCloseModal={handleCloseModal}
        handleAssignWorkInModal={handleAssignWorkInModal}
      />
      <ModalMultiDropdown
        options={deviceModal}
        values={deviceModalSelect}
        onChange={setDeviceModalSelect}
        visible={visibleModalFilter}
        onClose={() => {
          setVisibleModalFilter(false);
          setDeviceModalSelect([]);
        }}
        onDone={handleRefresh}
      />
    </BasePage>
  );
};

export default ListJobTodayScreen;
