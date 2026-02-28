import { SRC_IMAGE_LOGO } from '@/assets/images';
import { AppButton, AppInput, AppText, BasePage } from '@/components';
import SizeBox from '@/components/SizeBox';
import { PRIMARY } from '@/utils/color';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import useLogin from './hooks/useLogin';
export default function LoginScreen() {
  const {
    passwordVisible,
    setPasswordVisible,
    password,
    setPassword,
    userName,
    setUserName,
    handleLogin
  } = useLogin();

  return (
    <BasePage
      scrollable
      containerStyle={{ backgroundColor: '#f6f6f8' }}
      centerComponent={
        <Image
          source={SRC_IMAGE_LOGO}
          style={{
            width: 140,
            height: 140,
          }}
          resizeMode="contain"
        />
      }
    >
      <SizeBox height={80} />

      <View style={styles.titleWrap}>
        <AppText style={styles.title}>Chào mừng trở lại</AppText>
        <AppText style={styles.subtitle}>
          Vui lòng đăng nhập để tiếp tục
        </AppText>
      </View>
      <SizeBox height={40} />

      <AppInput
        label="Tên đăng nhập"
        placeholder="Nhập tên đăng nhập"
        placeholderTextColor="#999"
        leadingIcon="person"
        value={userName}
        onChangeText={setUserName}
      />

      <AppInput
        label="Mật khẩu"
        placeholder="••••••••"
        placeholderTextColor="#999"
        leadingIcon="lock"
        trailingIcon={passwordVisible ? 'visibility-off' : 'visibility'}
        secureTextEntry={passwordVisible}
        onPressTrailingIcon={() => setPasswordVisible(!passwordVisible)}
        value={password}
        onChangeText={setPassword}
      />

      <AppButton title="Đăng nhập" onPress={handleLogin} buttonIcon="login" />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Chưa có tài khoản?{' '}
          <Text style={styles.link}>Liên hệ quản trị viên</Text>
        </Text>
      </View>
    </BasePage>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f6f6f8',
  },
  container: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backBtn: {
    padding: 8,
  },
  logoWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  titleWrap: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 56,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  forgot: {
    fontSize: 12,
    color: PRIMARY,
    fontWeight: '600',
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  link: {
    color: PRIMARY,
    fontWeight: '700',
  },
});
