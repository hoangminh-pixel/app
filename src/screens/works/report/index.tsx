import { BasePage } from '@/components';
import SizeBox from '@/components/SizeBox';
import React from 'react';
import DateFilter from './components/DateFilter';
import DonutChart from '@/components/DonutChart';
import SummarySection from './components/SummarySection';
import CustomCalendar from '@/components/CalendartCutom';
import { Modal, Pressable, View } from 'react-native';
import useReport from './hooks/useReport';
import moment from 'moment';
import { styles } from './styles';
import WorkTypeSelector from './components/WorkTypeSelector';
import ReportSkeleton from '@/components/skeletons/ReportSkeleton';

export default function ReportWorkScreen() {
  const {
    selectedDateStart,
    setSelectedDateStart,
    visibleModalDateStart,
    setVisibleModalDateStart,
    selectedDateEnd,
    setSelectedDateEnd,
    visibleModalDateEnd,
    setVisibleModalDateEnd,
    types,
    setTypes,
    data,
    totalDraft,
    totalInprogress,
    totalDone,
    handleGetData,
    skeleton,
    refresh,
    handleRefresh,
  } = useReport();

  return (
    <BasePage
      scrollable
      paddingHorizontal={0}
      containerStyle={{ backgroundColor: 'white' }}
      onRefresh={handleRefresh}
      refreshing={refresh}
    >
      <SizeBox height={8} />

      <DateFilter
        startDate={moment(selectedDateStart).format('DD/MM/YYYY')}
        endDate={moment(selectedDateEnd).format('DD/MM/YYYY')}
        onClickStartDate={() => setVisibleModalDateStart(true)}
        onClickEndDate={() => setVisibleModalDateEnd(true)}
        onSearch={handleGetData}
      />

      {skeleton ? (
        <ReportSkeleton />
      ) : (
        <>
          <SummarySection data={data} />

          <SizeBox height={16} />

          <DonutChart
            data={[
              { label: 'Chưa làm', value: totalDraft, color: '#ef4444' },
              { label: 'Đang làm', value: totalInprogress, color: '#f59e0b' },
              { label: 'Hoàn thành', value: totalDone, color: '#10b981' },
            ]}
          />
        </>
      )}

      <WorkTypeSelector value={types} onChange={setTypes} />

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
    </BasePage>
  );
}
