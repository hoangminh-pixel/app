import { AppText, BasePage } from '@/components';
import Dropdown from '@/components/DropDown';
import Icon from '@react-native-vector-icons/material-icons';
import React, { Fragment, useState } from 'react';
import { Image, Pressable, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { Section, SectionInput, SectionTitle } from './components/Section';
import SizeBox from '@/components/SizeBox';
import useCreateReportProblem from './hooks/useCreateReportProblem';
import Video from 'react-native-video';

export default function CreateReportProbemScreen() {
  const {
    requestEmployee,
    listReceiveDepartment,
    listZone,
    listLocation,
    zone,
    setZone,
    location,
    setLocation,
    maintenanceGroup,
    setMaintenanceGroup,
    priority,
    setPriority,
    handleOpenCamera,
    handleOpenPhoto,
    mediaResponse,
    removeMedia,
    handleCreateMroRequest,
    description,
    priorityLevels,
    setDescription,
    title,
    setTitle,
    onFocusInput,
    onBlurInput,
    keyboardShouldPersistTaps,
    openLibrary,
    handleNavigateScanScreen,
    handleNavigateDetailMedia,
  } = useCreateReportProblem();

  return (
    <BasePage edges={['bottom']} paddingHorizontal={0}>
      <BasePage
        scrollable
        title="Báo sự cố"
        showBack
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        actions={
          <Pressable onPress={handleNavigateScanScreen}>
            <Icon name="qr-code-scanner" size={24} color="white" />
          </Pressable>
        }
      >
        <SizeBox height={16} />
        <Section title="Thông tin chung" icon="info" />
        <SizeBox height={16} />

        <SectionInput
          label={`Tiêu đề *`}
          value={title}
          onChangeText={setTitle}
          onFocus={onFocusInput}
          onBlur={onBlurInput}
        />

        <Dropdown
          label="Mức độ ưu tiên"
          value={priority?.value}
          options={priorityLevels}
          onChange={setPriority}
        />
        <SizeBox height={16} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Section title="Hình ảnh" icon="image" />

          <View style={{ flexDirection: 'row', gap: 16 }}>
            <TouchableOpacity onPress={handleOpenCamera}>
              <Icon name="videocam" size={22} color="#94a3b8" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOpenPhoto}>
              <Icon name="photo-camera" size={22} color="#94a3b8" />
            </TouchableOpacity>

            <TouchableOpacity onPress={openLibrary}>
              <Icon name="image" size={22} color="#94a3b8" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.imageGrid}>
          {mediaResponse.map((item, index) =>
            item.type === 'photo' ? (
              <View key={index} style={styles.imageWrapper}>
                <Pressable
                  onPress={() => {
                    handleNavigateDetailMedia({ url: item.url, type: 'photo' });
                  }}
                >
                  <Image
                    source={{
                      uri: item.url,
                    }}
                    style={styles.imageChecklist}
                  />
                </Pressable>
                <Pressable
                  style={styles.removeBtn}
                  onPress={() => removeMedia(index)}
                >
                  <Icon name="close" size={14} color="white" />
                </Pressable>
              </View>
            ) : (
              <View key={index} style={styles.imageWrapper}>
                <Pressable
                  onPress={() => {
                    handleNavigateDetailMedia({ url: item.url, type: 'video' });
                  }}
                >
                  <Video
                    style={[styles.imageChecklist, { overflow: 'hidden' }]}
                    source={{ uri: item.url }}
                    muted
                    repeat
                    resizeMode="cover"
                  />
                </Pressable>
                <Pressable
                  style={styles.removeBtn}
                  onPress={() => removeMedia(index)}
                >
                  <Icon name="close" size={14} color="white" />
                </Pressable>
              </View>
            ),
          )}
        </View>
        <SizeBox height={16} />

        <SectionInput
          label="Mô tả chi tiết"
          multiline
          value={description}
          onChangeText={setDescription}
          onFocus={onFocusInput}
          onBlur={onBlurInput}
        />

        <Dropdown
          label="Khu vực"
          value={zone?.value}
          options={listZone}
          onChange={setZone}
        />
        <SizeBox height={16} />

        <Dropdown
          label="Vị trí"
          value={location?.value}
          options={listLocation}
          onChange={setLocation}
        />
        <SizeBox height={16} />

        <Dropdown
          label="Nhóm bảo trì"
          value={maintenanceGroup?.value}
          options={listReceiveDepartment}
          onChange={setMaintenanceGroup}
        />

        <SizeBox height={16} />
        <SectionTitle title="Người yêu cầu" />
        <SizeBox height={10} />

        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <AppText style={{ color: 'white' }}>👤</AppText>
          </View>

          <View>
            <AppText style={styles.userName}>{requestEmployee}</AppText>
          </View>
        </View>
        <SizeBox height={16} />
      </BasePage>
      <View style={styles.footer}>
        <Pressable style={styles.submitBtn} onPress={handleCreateMroRequest}>
          <Icon name="send" size={18} color="white" />
          <AppText style={styles.submitText}>Gửi yêu cầu</AppText>
        </Pressable>
      </View>
    </BasePage>
  );
}
