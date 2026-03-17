import { AppText, BasePage } from '@/components';
import CustomCalendar from '@/components/CalendartCutom';
import Dropdown from '@/components/DropDown';
import SizeBox from '@/components/SizeBox';
import {
  Section,
  SectionInput,
  SectionTitle,
} from '@/screens/request/createReportProblem/components/Section';
import { isAndroid, USER } from '@/utils/appConstant';
import Icon from '@react-native-vector-icons/material-icons';
import moment from 'moment';
import React from 'react';
import {
  Image,
  Modal,
  Platform,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';
import { styles } from '../styles';
import useCreateRepairRequest from './hooks/useCreateRepairRequest';
import RejectReasonModal from '@/components/RejectModal';
import RequestRepairSkeleton from '@/components/skeletons/RequestSkeleton';

export default function CreateRepairRequestScreen() {
  const {
    requestEmployee,
    listDeviceGroup,
    listReceiveDepartment,
    listZone,
    priorityLevels,
    listAsset,
    listFunc,
    listLocation,
    asset,
    setAsset,
    deviceGroup,
    setDeviceGroup,
    zone,
    setZone,
    location,
    setLocation,
    receiveDepartment,
    setReceiveDepartment,
    func,
    setFunc,
    maintenanceGroup,
    setMaintenanceGroup,
    priority,
    setPriority,
    handleChangeService,
    selectedDate,
    setSelectedDate,
    visibleModalDate,
    setVisibleModalDate,
    handleOpenCamera,
    handleOpenPhoto,
    mediaResponse,
    removeMedia,
    handleCreateMroRequest,
    description,
    setDescription,
    titleReport,
    setTitleReport,
    state,
    role,
    handleApproveOrRejectMroRequest,
    showRejectModal,
    handleShowRejectModal,
    handleHideRejectModal,
    showSkeleton,
    author,
    imagePrev,
    onFocusInput,
    onBlurInput,
    keyboardShouldPersistTaps,
    openLibrary,
    handleNavigateScanScreen,
    setIsCreateRequest,
    handleNavigateDetailMedia,
    disableDropdownWhenUserViewDetail,
  } = useCreateRepairRequest();

  if (showSkeleton)
    return (
      <BasePage
        edges={['bottom']}
        title={author ? 'Báo sự cố' : 'Yêu cầu sửa chữa'}
        showBack
        paddingHorizontal={0}
        containerStyle={{ flex: 1 }}
        actions={
          <Pressable onPress={handleNavigateScanScreen}>
            <Icon name="qr-code-scanner" size={24} color="white" />
          </Pressable>
        }
      >
        <RequestRepairSkeleton />
      </BasePage>
    );

  return (
    <BasePage edges={['bottom']} paddingHorizontal={0}>
      <BasePage
        scrollable
        title={author ? 'Báo sự cố' : 'Yêu cầu sửa chữa'}
        showBack
        bottomOffset={isAndroid ? 100 : 30}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        actions={
          <Pressable onPress={handleNavigateScanScreen}>
            <Icon name="qr-code-scanner" size={24} color="white" />
          </Pressable>
        }
      >
        <SizeBox height={16} />
        <Section title="Thông tin chung" icon="info" />
        {titleReport && (
          <SectionInput
            disable={disableDropdownWhenUserViewDetail}
            label={`Tiêu đề *`}
            value={titleReport}
            onChangeText={setTitleReport}
            onFocus={onFocusInput}
            onBlur={onBlurInput}
          />
        )}
        <Dropdown
          disable={disableDropdownWhenUserViewDetail}
          label="Thiết bị"
          value={asset?.value}
          options={listAsset}
          onChange={v => {
            setAsset(v);
            setIsCreateRequest(true);
          }}
        />
        <SizeBox height={10} />

        <Dropdown
          disable={deviceGroup?.id || disableDropdownWhenUserViewDetail}
          label="Nhóm thiết bị"
          value={deviceGroup?.value}
          options={listDeviceGroup}
          onChange={setDeviceGroup}
        />
        <SizeBox height={10} />

        <Dropdown
          disable={zone?.id || disableDropdownWhenUserViewDetail}
          label="Khu vực"
          value={zone?.value}
          options={listZone}
          onChange={setZone}
        />
        <SizeBox height={10} />

        <Dropdown
          disable={location?.id || disableDropdownWhenUserViewDetail}
          label="Vị trí"
          value={location?.value}
          options={listLocation}
          onChange={setLocation}
        />
        <SizeBox height={10} />

        <Dropdown
          label="Phòng ban"
          value={receiveDepartment?.value}
          options={listReceiveDepartment}
          onChange={setReceiveDepartment}
          disable={disableDropdownWhenUserViewDetail}
        />
        <SizeBox height={10} />

        <Dropdown
          label="Dịch vụ"
          value={func?.value}
          options={listFunc}
          onChange={item => {
            handleChangeService(item?.id);
          }}
          disable={disableDropdownWhenUserViewDetail}
        />
        <SizeBox height={10} />

        <Dropdown
          label="Nhóm bảo trì"
          value={maintenanceGroup?.value}
          options={listReceiveDepartment}
          onChange={setMaintenanceGroup}
          disable={disableDropdownWhenUserViewDetail}
        />
        <SizeBox height={10} />

        <Dropdown
          label="Mức độ ưu tiên"
          value={priority?.value}
          options={priorityLevels}
          onChange={setPriority}
          disable={disableDropdownWhenUserViewDetail}
        />

        <SizeBox height={16} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Section title="Ngày yêu cầu" icon="location-on" />
          <AppText style={styles.userName}>
            {moment().format('DD/MM/YYYY')}
          </AppText>
        </View>

        <SizeBox height={8} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Section title="Ngày hoàn thành dự kiến" icon="location-on" />
          <AppText
            onPress={() => setVisibleModalDate(true)}
            style={{ ...styles.userName, textDecorationLine: 'underline' }}
          >
            {moment(selectedDate).format('DD/MM/YYYY')}
          </AppText>
        </View>

        <SizeBox height={16} />

        {/* HÌNH ẢNH */}
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
          {imagePrev?.map((item, index) => {
            const isImage = /\.(jpe?g|png|gif|webp)$/i.test(
              item.image_url || item.value,
            );
            return isImage ? (
              <View key={index} style={styles.imageWrapper}>
                <Pressable
                  onPress={() => {
                    handleNavigateDetailMedia({
                      url: item.image_url || item.value,
                      type: 'photo',
                    });
                  }}
                >
                  <Image
                    source={{
                      uri: item.image_url || item.value,
                    }}
                    style={styles.imageChecklist}
                  />
                </Pressable>
              </View>
            ) : (
              <View key={index} style={styles.imageWrapper}>
                <Pressable
                  onPress={() => {
                    handleNavigateDetailMedia({
                      url: item.image_url || item.value,
                      type: 'video',
                    });
                  }}
                >
                  <Video
                    style={[styles.imageChecklist, { overflow: 'hidden' }]}
                    source={{ uri: item.image_url || item.value }}
                    muted
                    repeat
                    resizeMode="cover"
                  />
                </Pressable>
              </View>
            );
          })}
        </View>

        <SizeBox height={16} />

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
        <SectionTitle title="Người yêu cầu" />
        <SizeBox height={10} />

        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <AppText style={{ color: 'white' }}>👤</AppText>
          </View>

          <View>
            <AppText style={styles.userName}>
              {author ? author : requestEmployee}
            </AppText>
            {/* <AppText style={styles.userInfo}>
              Mã NV: NV0923 • Phòng Hành chính
            </AppText> */}
          </View>
        </View>

        <SizeBox height={16} />

        <SectionInput
          disable={disableDropdownWhenUserViewDetail}
          label="Mô tả"
          multiline
          value={description}
          onChangeText={setDescription}
          onFocus={onFocusInput}
          onBlur={onBlurInput}
        />
      </BasePage>
      {state === 'waiting' && role !== USER && (
        <View style={styles.footer}>
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.footer, { flex: 1, padding: 0 }]}>
              <Pressable
                style={[styles.submitBtn, { backgroundColor: '#ef4444' }]}
                onPress={handleShowRejectModal}
              >
                <Icon name="cancel" size={22} color="white" />
                <AppText style={styles.submitText}>Từ chối</AppText>
              </Pressable>
            </View>
            <SizeBox width={8} />
            <View style={[styles.footer, { flex: 1, padding: 0 }]}>
              <Pressable
                style={styles.submitBtn}
                onPress={async () => {
                  await handleApproveOrRejectMroRequest('action_approve');
                }}
              >
                <Icon name="done" size={22} color="white" />
                <AppText style={styles.submitText}>Xác nhận</AppText>
              </Pressable>
            </View>
          </View>
        </View>
      )}
      {!state && (
        <View style={styles.footer}>
          <Pressable style={styles.submitBtn} onPress={handleCreateMroRequest}>
            <Icon name="send" size={18} color="white" />
            <AppText style={styles.submitText}>Gửi yêu cầu</AppText>
          </Pressable>
        </View>
      )}
      <Modal transparent visible={visibleModalDate}>
        <Pressable
          style={styles.overlay}
          onPress={() => setVisibleModalDate(false)}
        >
          <View
            style={[
              styles.calendarContainer,
              { bottom: Platform.OS === 'android' ? 30 : 70, right: 10 },
            ]}
          >
            <CustomCalendar
              selectedDate={selectedDate}
              onSelect={(date: Date) => {
                setSelectedDate(date);
                setVisibleModalDate(false);
              }}
            />
          </View>
        </Pressable>
      </Modal>
      <RejectReasonModal
        visible={showRejectModal}
        onClose={handleHideRejectModal}
        onConfirm={async reason => {
          await handleApproveOrRejectMroRequest('action_cancel_order', reason);
        }}
      />
    </BasePage>
  );
}
