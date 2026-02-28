import { AppText } from '@/components';
import BasePage from '@/components/BasePage';
import Icon from '@react-native-vector-icons/material-icons';
import React from 'react';
import {
  FlatList,
  Image,
  TouchableOpacity,
  View
} from 'react-native';
import { StatusCard } from './components/StatusCard';
import { TaskItem } from './components/TaskItem';
import { styles } from './styles';

const HomeScreen = () => {
  return (
    <BasePage
      title="Trang chủ"
      actions={
        <TouchableOpacity>
          <Icon name="settings" size={24} color="white" />
        </TouchableOpacity>
      }
    >
      <FlatList
        data={[] as any}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <TaskItem {...item} />}
        ListHeaderComponent={
          <>
            <View style={styles.section}>
              <View style={styles.profileCard}>
                <View style={styles.avatarWrapper}>
                  <Image
                    source={{
                      uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhNeLjnVNDNg-xxiMV83tPvrxWe-NyUYsQ0qihR1Pro0U628sTLJbGtuknfFyjSeTcKAJK9eVFzfIthOry11EXvQd88wnZRp4mo2cojduyx_149hlT7lu2zI1R9wFt0xC604XvTKTza1ieBwWZcYtmsbe8QDtb-6LVD-u8N31w4f6A7y-qoyQuxiJQT8sr7vGYYhSqPn8H2R_LoD1rwguw6OQgz93RKmttUowp1SlEDG5ZpkbLZMtNDyNAlIs8yGY8_gHFH_0shkIJ',
                    }}
                    style={styles.avatar}
                  />
                </View>

                <View>
                  <AppText style={styles.welcome}>Xin chào, Admin</AppText>
                  <AppText style={styles.role}>Quản trị viên hệ thống</AppText>
                </View>
              </View>
            </View>

            {/* Status */}
            <View style={styles.section}>
              <AppText style={styles.sectionTitle}>
                CÔNG VIỆC TRONG NGÀY
              </AppText>
              <View style={styles.statusGrid}>
                <StatusCard
                  icon="pending-actions"
                  number="12"
                  label="Đang thực hiện"
                  color="#3b82f6"
                />
                <StatusCard
                  icon="check-circle"
                  number="08"
                  label="Đã hoàn thành"
                  color="#22c55e"
                />
                <StatusCard
                  icon="warning"
                  number="02"
                  label="Trễ hạn"
                  color="#f43f5e"
                />
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.rowBetween}>
                <AppText style={styles.sectionTitle}>HOẠT ĐỘNG GẦN ĐÂY</AppText>
                <AppText style={styles.viewAll}>Xem tất cả</AppText>
              </View>

              <TaskItem
                icon="computer"
                title="Bảo trì hệ thống máy chủ CNTT"
                location="Tầng 4 - Khu vực A"
                status="MỚI"
                time="10:30 AM"
              />

              <TaskItem
                icon="router"
                title="Kiểm tra kết nối mạng nội bộ"
                location="Phòng họp 202"
                status="XONG"
                time="09:15 AM"
              />

              <TaskItem
                icon="print"
                title="Thay mực máy in phòng kế toán"
                location="Tầng 1 - Sảnh chính"
                status="HẾT HẠN"
                time="Hôm qua"
              />
            </View>
          </>
        }
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </BasePage>
  );
};

export default HomeScreen;


