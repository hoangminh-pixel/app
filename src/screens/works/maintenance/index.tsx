import { AppInput, BasePage } from '@/components';
import { AppFlatList } from '@/components/AppFlatList';
import CustomCalendar from '@/components/CalendartCutom';
import { ModalDropdown } from '@/components/DropDown';
import SizeBox from '@/components/SizeBox';
import { Detail } from '@/services/workRepair';
import React from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';
import AssignWorkModal from './components/AssignWorkModal';
import { FilterButton } from './components/FilterButton';
import { JobCard } from './components/JobCard';
import useMaintenance from './hooks/useMaintenance';
import { styles } from './styles';
import JobListSkeleton from '@/components/skeletons/ListJobSkeleton';

export default function MaintanenceScreen() {
  const {
    search,
    setSearch,
    selectedButton,
    selectionType,
    onPressSelectionType,
    visible,
    buttonRef,
    setVisible,
    position,
    selectedDate,
    setSelectedDate,
    dataMaintanence,
    handleRefresh,
    handleLoadMore,
    loading,
    refreshing,
    hasMore,
    visibleModalFilter,
    setVisibleModalFilter,
    STATUS_OPTIONS,
    visibleAssignWorkModal,
    setVisibleAssignWorkModal,
    handleAssignWork,
    dataDetailJob,
    checkEmployee,
    setCheckEmployee,
    technicians,
    setTechnicians,
    techniciansWorkToo,
    setCheckEmployeeWorkToo,
    handleCloseModal,
    handleAssignWorkInModal,
    handleChangeFilterStatus,
    dataMaintanenceFilter,
    navigation,
    handleReloadWhenBack,
    showSkeleton,
  } = useMaintenance();

  return (
    <BasePage
      paddingHorizontal={0}
      containerStyle={{ backgroundColor: '#f6f6f8' }}
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {selectionType.map(item => {
            return (
              <FilterButton
                key={item.type}
                label={item.label}
                icon={item.icon}
                active={selectedButton === item.type}
                onPress={() => onPressSelectionType({ type: item.type })}
                ref={buttonRef}
              />
            );
          })}
        </ScrollView>
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
                console.log('press item');
                navigation.navigate('DetailRepairScreen', {
                  id: item.id,
                  onGoBack: handleReloadWhenBack,
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

      <Modal transparent visible={visible}>
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View
            style={[styles.calendarContainer, { top: position.top, right: 10 }]}
          >
            <CustomCalendar
              selectedDate={selectedDate}
              onSelect={(date: Date) => {
                setSelectedDate(date);
                setVisible(false);
              }}
            />
          </View>
        </Pressable>
      </Modal>

      <ModalDropdown
        options={STATUS_OPTIONS}
        onChange={item => {
          handleChangeFilterStatus(item?.id);
        }}
        visible={visibleModalFilter}
        onVisible={() => {
          if (visibleModalFilter) {
            setVisibleModalFilter(false);
          } else {
            setVisibleModalFilter(true);
          }
        }}
      />
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
    </BasePage>
  );
}
