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
];

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
      return '#1337ec';
    case 'Hoàn thành':
      return '#10b981';
    default:
      return '#6b7280';
  }
};

export default function RequestListScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Icon name="arrow-back" size={22} />
          <Text style={styles.headerTitle}>Danh sách yêu cầu</Text>
        </View>
        <Icon name="search" size={22} />
      </View>
    </SafeAreaView>
  );
}
