import { BasePage } from '@/components';
import SizeBox from '@/components/SizeBox';
import { setCurrentModule } from '@/redux/slices/appSlice';
import { logout } from '@/redux/slices/authSlice';
import { useAppDispatch } from '@/redux/store/hooks';
import { PRIMARY } from '@/utils/color';
import {
  removeCurrentModuleStorage,
  removeUserInfo,
  removeUserInfoASM,
} from '@/utils/storage';
import { showErrorToast } from '@/utils/toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '@react-native-vector-icons/material-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';

export default function SettingScreen() {
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    try {
      await removeUserInfo();
      await removeUserInfoASM();
      await removeCurrentModuleStorage();
      dispatch(setCurrentModule(null));
      dispatch(logout());
    } catch (error) {
      showErrorToast({});
    }
  };
  return (
    <BasePage
      showBack
      containerStyle={{ backgroundColor: 'white' }}
      title="Cài đặt"
      edges={['bottom']}
    >
      <SizeBox height={16} />

      <View style={styles.footer}>
        <LogoutButton onPress={handleLogOut} />

        <Text style={styles.footerText}>
          ERPViet © {new Date().getFullYear()}
        </Text>
      </View>
    </BasePage>
  );
}

type LogoutButtonProps = {
  onPress: () => void;
  title?: string;
};

const LogoutButton: React.FC<LogoutButtonProps> = ({
  onPress,
  title = 'Đăng xuất',
}) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <View style={styles.content}>
        <Icon name="logout" size={20} color="#fff" />

        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: PRIMARY,
    borderRadius: 18,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  text: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    borderTopWidth: 1,
    borderColor: '#f1f5f9',
    backgroundColor: '#fff',
  },

  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 12,
  },
});
