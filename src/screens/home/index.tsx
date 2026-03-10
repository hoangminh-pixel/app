import { AppText } from '@/components';
import BasePage from '@/components/BasePage';
import Icon from '@react-native-vector-icons/material-icons';
import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { StatusCard } from './components/StatusCard';
import { TaskItem } from './components/TaskItem';
import { styles } from './styles';
import useHome from './hooks/useHome';
import { Content } from './components/Content';
import HomeSkeleton from '@/components/skeletons/HomeSkeleton';
import { AppFlatList } from '@/components/AppFlatList';

const HomeScreen = () => {
  const { homeData, summary, showSkeleton, handleGetDataHome } = useHome();

  if (showSkeleton) {
    return (
      <BasePage
        title="Trang chủ"
        paddingHorizontal={0}
        actions={
          <TouchableOpacity>
            <Icon name="settings" size={24} color="white" />
          </TouchableOpacity>
        }
      >
        <HomeSkeleton />
      </BasePage>
    );
  }

  return (
    <BasePage
      title="Trang chủ"
      actions={
        <TouchableOpacity>
          <Icon name="settings" size={24} color="white" />
        </TouchableOpacity>
      }
    >
      <AppFlatList
        refreshing={showSkeleton}
        onRefresh={handleGetDataHome}
        data={[] as any}
        keyExtractor={({ item }: { item: any }) => item.id.toString()}
        renderItem={({ item }: { item: any }) => <TaskItem {...item} />}
        ListHeaderComponent={<Content data={homeData} summary={summary} />}
        ListEmptyComponent={<></>}
      />
    </BasePage>
  );
};

export default HomeScreen;
