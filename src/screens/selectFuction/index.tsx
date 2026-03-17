import { BasePage } from '@/components';
import { setCurrentModule } from '@/redux/slices/appSlice';
import { useAppDispatch } from '@/redux/store/hooks';
import { PRIMARY } from '@/utils/color';
import { setCurrentModuleStorage } from '@/utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import useSelectFunction from './hooks/useSelectFunction';

const SelectFunctionScreen = () => {
  const { selectModule, handleSignInAsm } = useSelectFunction();

  return (
    <BasePage title="Chọn chức năng" paddingHorizontal={0}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <FunctionCard
            icon="🛠"
            title="Bảo trì"
            description="Quản lý và thực hiện các công việc bảo trì định kỳ cho hệ thống của bạn."
            onPress={() => selectModule('maintenance')}
          />

          <FunctionCard
            icon="📦"
            title="Tài sản"
            description="Theo dõi và quản lý danh mục tài sản, trang thiết bị của doanh nghiệp."
            onPress={async () => {
              await handleSignInAsm();
              await selectModule('asset');
            }}
          />
        </ScrollView>
      </View>
    </BasePage>
  );
};

const FunctionCard = ({
  icon,
  title,
  description,
  onPress,
}: {
  icon: string;
  title: string;
  description: string;
  onPress: () => void;
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
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Truy cập →</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectFunctionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8ff', // nền sáng
  },

  content: {
    paddingHorizontal: 24,
    paddingVertical: 30,
    gap: 20,
  },

  card: {
    backgroundColor: '#ffffff', // card trắng
    borderRadius: 14,
    padding: 22,

    borderWidth: 1,
    borderColor: 'rgba(19,55,236,0.08)',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 14,

    backgroundColor: 'rgba(19,55,236,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(19,55,236,0.25)',

    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  icon: {
    fontSize: 28,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },

  cardDesc: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 18,
    marginBottom: 16,
  },

  button: {
    backgroundColor: PRIMARY,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
