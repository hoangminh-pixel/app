import { useAppSelector } from '@/redux/store/hooks';
import { getListJob } from '@/services/workRepair';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';
import CurrentTimeLine from './components/CurrentTimeLine';
import JobsLayer from './components/JobsLayer';
import TimelineGrid from './components/TimelineGrid';
import { styles } from './styles';
import useCalendar from './hooks/useCalendar';
import { BasePage } from '@/components';
import { FilterButton } from '../works/maintenance/components/FilterButton';
import CustomCalendar from '@/components/CalendartCutom';
import SizeBox from '@/components/SizeBox';
import CalendarSkeleton from '@/components/skeletons/CalendarSkeleton';
import { screenWidth } from '@/utils/appConstant';

const JobTimeScreen = ({}) => {
  const {
    times,
    columns,
    selectionType,
    onPressSelectionType,
    visible,
    position,
    buttonRef,
    selectedButton,
    setVisible,
    selectedDate,
    setSelectedDate,
    loading,
    handleNavigate,
    layoutJobs,
    list,
  } = useCalendar();

  return (
    <BasePage title="Lịch trình" paddingHorizontal={0}>
      <SizeBox height={16} />
      <View style={{ flexDirection: 'row', paddingLeft: 16 }}>
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
      </View>

      {loading ? (
        <CalendarSkeleton />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ position: 'relative' }}>
            <TimelineGrid hours={times} />

            <JobsLayer
              jobs={list}
              onPressJob={(job: { id: number }) => handleNavigate(job.id)}
            />
          </View>
        </ScrollView>
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
    </BasePage>
  );
};

export default JobTimeScreen;
