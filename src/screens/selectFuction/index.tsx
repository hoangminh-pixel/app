import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const SelectFunctionScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Chọn chức năng</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <FunctionCard
          icon="🛠"
          title="Bảo trì"
          description="Quản lý và thực hiện các công việc bảo trì định kỳ cho hệ thống của bạn."
        />

        <FunctionCard
          icon="📦"
          title="Tài sản"
          description="Theo dõi và quản lý danh mục tài sản, trang thiết bị của doanh nghiệp."
        />
      </ScrollView>
    </View>
  );
};

const FunctionCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => {
  return (
    <View style={styles.card}>
      {/* Icon */}
      <View style={styles.iconBox}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      {/* Title */}
      <Text style={styles.cardTitle}>{title}</Text>

      {/* Description */}
      <Text style={styles.cardDesc}>{description}</Text>

      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Truy cập →</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectFunctionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101322',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(19,55,236,0.1)',
  },

  backBtn: {
    padding: 8,
    marginRight: 8,
  },

  backIcon: {
    color: '#1337ec',
    fontSize: 20,
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginRight: 32,
  },

  content: {
    paddingHorizontal: 24,
    paddingVertical: 30,
    gap: 20,
  },

  card: {
    backgroundColor: '#1a1d2e',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(19,55,236,0.1)',
  },

  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: 'rgba(19,55,236,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  icon: {
    fontSize: 26,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
  },

  cardDesc: {
    fontSize: 13,
    color: '#9ca3af',
    lineHeight: 18,
    marginBottom: 16,
  },

  button: {
    backgroundColor: '#1337ec',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
