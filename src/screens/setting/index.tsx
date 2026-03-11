import { BasePage } from '@/components';
import SizeBox from '@/components/SizeBox';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import Icon from '@react-native-vector-icons/material-icons';
import { PRIMARY } from '@/utils/color';
import { removeUserInfo } from '@/utils/storage';
import { useAppDispatch } from '@/redux/store/hooks';
import { logout } from '@/redux/slices/authSlice';
import { showErrorToast } from '@/utils/toast';

export default function SettingScreen() {
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    try {
      await removeUserInfo();
      dispatch(logout());
    } catch (error) {
      showErrorToast({});
    }
  };
  return (
    <BasePage
      showBack
      containerStyle={{ backgroundColor: '#f6f6f8' }}
      title="Cài đặt"
      edges={['bottom']}
    >
      <SizeBox height={16} />

      <View style={styles.footer}>
        <LogoutButton onPress={handleLogOut} />

        <Text style={styles.footerText}>ERPViet © 2026</Text>
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
