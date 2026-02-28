import Icon from '@react-native-vector-icons/material-icons';
import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { styles } from './styles';

const DATA = [
  {
    id: '1',
    title: 'Sửa máy thổi khí',
    code: 'TB8000001',
    system: 'Xử lý nước thải',
    approver: 'Nguyễn Văn A',
    date: '24/10/2023',
    status: 'Chờ duyệt',
    priority: 'Khẩn cấp',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCu4wqoyu8gUWDafcgXrqoe2JAZnFKIuTzSiu2OpcWHSZ7PpwtKL3UVgpSwcg1WATckTrEuEB2A3C1reiQ7q1jJpVGx6d-rEF3uHDGIXXVGvOJc9QDgYEpAVCNKWmrfbM6Eh8DFzn7ZMAGjO0hFdazfvIdTbaoOIuf5Te7S4DmcCsG7r9qKicGSOze4x7P19sBu76g3J7_QQuG8FSS5Imaxe92KIdV5OtflKezQUM2UtgaIy4sthyoy2LtYPC1pO1BufiKUCza-kMq9',
  },
  {
    id: '2',
    title: 'Bảo trì máy bơm',
    code: 'TB8000002',
    system: 'Cấp nước',
    approver: 'Trần Thị B',
    date: '23/10/2023',
    status: 'Đang xử lý',
    priority: 'Bình thường',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC8U0zE_ld2ayJCF4gWliPWwZU_nOIWOXPiWpHY3OZulWkeA_hCJINBVw3bVbfxD7sp04kO41P_VizFhTKuzbBAs9wJy_e4g9mKxzgI9u3VvmjulU6VHe9B4Fe4xFSfrT5YxRcOJICKR9OwPEMaYLPvw-ki7hg16hAZk8XlawYH1N8-_sEBLgmbt1Prvke9dRlq2dHuCTn31ZnrMfzn2XbedszSUF1GDHgUbaYi1jiK8MfD6Qiuxy0sIkZm_UA6zUeK5-5Cs6KP_ULL',
  },
  {
    id: '3',
    title: 'Bảo trì máy bơm',
    code: 'TB8000002',
    system: 'Cấp nước',
    approver: 'Trần Thị B',
    date: '23/10/2023',
    status: 'Đang xử lý',
    priority: 'Bình thường',
    image: 'https://i.sstatic.net/y9DpT.jpg',
  },
];

//

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Khẩn cấp':
      return '#ef4444';
    case 'Bình thường':
      return '#3b82f6';
    default:
      return '#9ca3af';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Chờ duyệt':
      return '#f59e0b';
    case 'Đang xử lý':
      return '#3f5cee';
    case 'Hoàn thành':
      return '#10b981';
    default:
      return '#6b7280';
  }
};

export default function RequestListScreen() {
  return (
    <View style={styles.container}>
      {/* LIST */}
      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <RequestCard item={item} />}
        contentContainerStyle={{ padding: 16 }}
      />

      {/* FAB */}
      <Pressable style={styles.fab}>
        <Icon name="add" size={28} color="white" />
      </Pressable>
    </View>
  );
}

const RequestCard = ({ item }: any) => (
  <View style={styles.card}>
    <View>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View
        style={[
          styles.priorityBadge,
          { backgroundColor: getPriorityColor(item.priority) },
        ]}
      >
        <Text style={styles.priorityText}>{item.priority}</Text>
      </View>
    </View>

    <View style={styles.cardContent}>
      <View style={styles.rowBetween}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.code}>[{item.code}]</Text>
      </View>

      <InfoRow icon="settings" label="Hệ thống" value={item.system} />
      <InfoRow icon="person" label="Người tạo" value={item.approver} />
      <InfoRow icon="calendar-today" label="Ngày" value={item.date} />

      <View style={styles.infoRow}>
        <Icon name="info" size={16} color="#6b7280" />
        <Text style={styles.infoText}>
          Trạng thái:{' '}
          <Text
            style={{ color: getStatusColor(item.status), fontWeight: '700' }}
          >
            {item.status}
          </Text>
        </Text>
      </View>

      <Pressable style={styles.detailBtn}>
        <Text style={styles.detailText}>Xem chi tiết</Text>
      </Pressable>
    </View>
  </View>
);

const InfoRow = ({ icon, value }: any) => (
  <View style={styles.infoRow}>
    <Icon name={icon} size={16} color="#6b7280" />
    <Text style={styles.infoText}>
      <Text style={styles.bold}>{value}</Text>
    </Text>
  </View>
);
