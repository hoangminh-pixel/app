import { AppText, BasePage } from '@/components';
import CustomCalendar from '@/components/CalendartCutom';
import Dropdown from '@/components/DropDown';
import SizeBox from '@/components/SizeBox';
import {
  Section,
  SectionInput,
  SectionTitle,
} from '@/screens/request/createReportProblem/components/Section';
import { ADMIN, isAndroid, USER } from '@/utils/appConstant';
import Icon from '@react-native-vector-icons/material-icons';
import moment from 'moment';
import React from 'react';
import {
  Image,
  Modal,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';
import { styles } from '../styles';
import RejectReasonModal from '@/components/RejectModal';
import useDetailRequest from './hooks/useDetailRequest';
import RequestRepairSkeleton from '@/components/skeletons/RequestSkeleton';

export default function DetailRequestScreen() {
  const {
    detailRequestData,
    role,
    handleApproveOrRejectMroRequest,
    showRejectModal,
    handleShowRejectModal,
    handleHideRejectModal,
    showSkeleton,
  } = useDetailRequest();

  if (showSkeleton)
    return (
      <BasePage
        edges={['bottom']}
        title="Chi tiết yêu cầu"
        showBack
        paddingHorizontal={0}
        containerStyle={{ flex: 1 }}
      >
        <RequestRepairSkeleton />
      </BasePage>
    );

  return (
    <BasePage edges={['bottom']} paddingHorizontal={0}>
      <BasePage
        scrollable
        title="Chi tiết yêu cầu"
        showBack
        bottomOffset={isAndroid ? 100 : 30}
      >
        <SizeBox height={16} />
        <Section title="Thông tin chung" icon="info" />
        {detailRequestData?.title.title && (
          <View>
            <AppText style={{ ...styles.sectionTitle, marginLeft: 0 }}>
              Tiêu đề:
            </AppText>
            <AppText
              style={{
                ...styles.sectionTitle,
                marginLeft: 0,
                fontWeight: '600',
              }}
            >
              {detailRequestData?.title.title}
            </AppText>
          </View>
        )}
        <SizeBox height={16} />
        <Dropdown
          label="Thiết bị"
          value={detailRequestData?.asset_id?.name}
          options={[]}
          onChange={v => {}}
          disable
        />
        <SizeBox height={10} />

        <Dropdown
          label="Nhóm thiết bị"
          value={detailRequestData?.asset_category_level1_id?.name}
          options={[]}
          onChange={v => {}}
          disable
        />
        <SizeBox height={10} />

        <Dropdown
          label="Khu vực"
          value={detailRequestData?.zone_id?.name}
          options={[]}
          onChange={v => {}}
          disable
        />
        <SizeBox height={10} />

        <Dropdown
          label="Vị trí"
          value={detailRequestData?.mro_location_id?.name}
          options={[]}
          onChange={v => {}}
          disable
        />
        <SizeBox height={10} />

        <Dropdown
          label="Phòng ban"
          value={detailRequestData?.request_department_id?.name}
          options={[]}
          onChange={v => {}}
          disable
        />
        <SizeBox height={10} />

        <Dropdown
          label="Dịch vụ"
          value={detailRequestData?.cause_id?.name}
          options={[]}
          onChange={v => {}}
          disable
        />
        <SizeBox height={10} />

        <Dropdown
          label="Nhóm bảo trì"
          value={detailRequestData?.request_department_id?.name}
          options={[]}
          onChange={v => {}}
          disable
        />
        <SizeBox height={10} />

        <Dropdown
          label="Mức độ ưu tiên"
          value={detailRequestData?.priority_id?.name}
          options={[]}
          onChange={v => {}}
          disable
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
            {moment(detailRequestData?.requested_date?.requested_date).format(
              'DD/MM/YYYY',
            )}
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
          <AppText style={{ ...styles.userName }}>
            {moment(
              detailRequestData?.request_actual_date?.request_actual_date,
            ).format('DD/MM/YYYY')}
          </AppText>
        </View>

        <SizeBox height={16} />

        {/* HÌNH ẢNH */}
        <Section title="Hình ảnh" icon="image" />

        <View style={styles.imageGrid}>
          {detailRequestData?.list_image_request.list_image_request.map(
            (item, index) => {
              const isImage = /\.(jpe?g|png|gif|webp)$/i.test(
                item.image_url || item.value,
              );
              return isImage ? (
                <View key={index} style={styles.imageWrapper}>
                  <Image
                    source={{
                      uri: item.image_url || item.value,
                    }}
                    style={styles.imageChecklist}
                  />
                </View>
              ) : (
                <View key={index} style={styles.imageWrapper}>
                  <Video
                    style={[styles.imageChecklist, { overflow: 'hidden' }]}
                    source={{ uri: item.image_url || item.value }}
                    muted
                    repeat
                    resizeMode="cover"
                  />
                </View>
              );
            },
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
              {detailRequestData?.request_employee_id?.name}
            </AppText>
            {/* <AppText style={styles.userInfo}>
              Mã NV: NV0923 • Phòng Hành chính
            </AppText> */}
          </View>
        </View>

        <SizeBox height={16} />
        <View>
          <AppText style={{ ...styles.sectionTitle, marginLeft: 0 }}>
            Mô tả:
          </AppText>
          <AppText
            style={{
              ...styles.sectionTitle,
              marginLeft: 0,
              fontWeight: '600',
            }}
          >
            {detailRequestData?.describe?.describe}
          </AppText>
        </View>

        {detailRequestData?.reject_reason?.reject_reason && (
          <View>
            <SizeBox height={16} />
            <View>
              <AppText style={{ ...styles.sectionTitle, marginLeft: 0 }}>
                Lý do từ chối:
              </AppText>
              <AppText
                style={{
                  ...styles.sectionTitle,
                  marginLeft: 0,
                  fontWeight: '600',
                }}
              >
                {detailRequestData?.reject_reason?.reject_reason}
              </AppText>
            </View>
          </View>
        )}
        <SizeBox height={30} />
      </BasePage>
      {detailRequestData?.state?.state === 'claim' && role !== USER && (
        <View style={styles.footer}>
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.footer, { flex: 1, padding: 0 }]}>
              <Pressable
                style={[styles.submitBtn, { backgroundColor: '#ef4444' }]}
                onPress={handleShowRejectModal}
              >
                <Icon name="cancel" size={22} color="white" />
                <AppText style={styles.submitText}>Huỷ</AppText>
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
