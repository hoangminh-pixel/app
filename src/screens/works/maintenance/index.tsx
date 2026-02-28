import { AppInput, BasePage } from '@/components';
import { AppFlatList } from '@/components/AppFlatList';
import CustomCalendar from '@/components/CalendartCutom';
import { ModalDropdown } from '@/components/DropDown';
import SizeBox from '@/components/SizeBox';
import { Detail } from '@/services/workRepair';
import React from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { FilterButton } from './components/FilterButton';
import { JobCard } from './components/JobCard';
import useMaintenance from './hooks/useMaintenance';
import { styles } from './styles';
import AssignWorkModal from './components/AssignWorkModal';

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

      <AppFlatList
        data={dataMaintanence}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }: { item: Detail }) => (
          <JobCard item={item} onPressAssignWork={handleAssignWork} />
        )}
        contentContainerStyle={{ padding: 16 }}
        onRefresh={handleRefresh}
        onLoadMore={handleLoadMore}
        loading={loading}
        refreshing={refreshing}
        hasMore={hasMore}
      />

      <Modal transparent visible={visible} animationType="fade">
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
        onChange={() => {}}
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
      />
    </BasePage>
  );
}
