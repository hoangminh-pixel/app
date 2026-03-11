import { BasePage } from '@/components';
import React, { useState } from 'react';
import FilterSection from './components/FilterSection';
import SizeBox from '@/components/SizeBox';
import CustomCalendar from '@/components/CalendartCutom';
import { Modal, Pressable, View } from 'react-native';
import { styles } from './styles';
import moment from 'moment';
import { ModalDropdown } from '@/components/DropDown';
import useDashboard from './hooks/useDashboard';
import { ContentDashboard } from './components/Content';
import DashboardSkeleton from '@/components/skeletons/DashboardSkeleton';
export default function DashboardScreen() {
  const {
    bussinessModal,
    selectedDateStart,
    setSelectedDateStart,
    visibleModalDateStart,
    setVisibleModalDateStart,
    selectedDateEnd,
    setSelectedDateEnd,
    visibleModalDateEnd,
    setVisibleModalDateEnd,
    modalLocation,
    setModalLocation,
    location,
    setLocation,
    dashboardData,
    showSkeleton,
    handleGetDashboardSummary,
    refresh,
    handleRefresh,
  } = useDashboard();

  return (
    <BasePage
      scrollable
      containerStyle={{ backgroundColor: '#f6f6f8' }}
      title="Báo cáo"
      refreshing={refresh}
      onRefresh={handleRefresh}
      keyboardShouldPersistTaps="always"
    >
      <SizeBox height={16} />

      <FilterSection
        startDate={moment(selectedDateStart).format('DD/MM')}
        endDate={moment(selectedDateEnd).format('DD/MM')}
        onClickStartDate={() => setVisibleModalDateStart(true)}
        onClickEndDate={() => setVisibleModalDateEnd(true)}
        location={location?.value ?? ''}
        onClickLocation={() => setModalLocation(true)}
      />

      <SizeBox height={32} />

      {showSkeleton ? (
        <DashboardSkeleton />
      ) : (
        <ContentDashboard
          startDate={moment(selectedDateStart).format('DD/MM')}
          endDate={moment(selectedDateEnd).format('DD/MM')}
          data={dashboardData}
        />
      )}

      <Modal transparent visible={visibleModalDateStart}>
        <Pressable
          style={styles.overlay}
          onPress={() => setVisibleModalDateStart(false)}
        >
          <View style={[styles.calendarContainer]}>
            <CustomCalendar
              initialDate={selectedDateStart}
              selectedDate={selectedDateStart}
              onSelect={(date: Date) => {
                setSelectedDateStart(date);
                setVisibleModalDateStart(false);
              }}
            />
          </View>
        </Pressable>
      </Modal>

      <Modal transparent visible={visibleModalDateEnd}>
        <Pressable
          style={styles.overlay}
          onPress={() => setVisibleModalDateEnd(false)}
        >
          <View style={[styles.calendarContainer]}>
            <CustomCalendar
              initialDate={selectedDateEnd}
              selectedDate={selectedDateEnd}
              onSelect={(date: Date) => {
                setSelectedDateEnd(date);
                setVisibleModalDateEnd(false);
              }}
            />
          </View>
        </Pressable>
      </Modal>

      <ModalDropdown
        options={bussinessModal}
        visible={modalLocation}
        onVisible={() => setModalLocation(false)}
        onChange={setLocation}
      />
    </BasePage>
  );
}
