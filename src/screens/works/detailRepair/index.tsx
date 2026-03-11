import { AppText, BasePage } from '@/components';
import RejectReasonModal from '@/components/RejectModal';
import SizeBox from '@/components/SizeBox';
import { Section } from '@/screens/request/createReportProblem/components/Section';
import Icon from '@react-native-vector-icons/material-icons';
import React, { Fragment } from 'react';
import {
  Image,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';
import AssignWorkModal from '../maintenance/components/AssignWorkModal';
import { HeaderComponent } from './components/Header';
import JobDetailSkeleton from './components/SkeletonUI';
import { SuppliesComponent } from './components/Supplies';
import useDetailRepair from './hooks/useDetailRepair';
import { styles } from './styles';
import { ChecklistComponent } from '../detailMaintenance/components/Checklist';

export default function DetailRepairScreen() {
  const {
    dataDetailJob,
    skelenton,
    visibleAssignWorkModal,
    setVisibleAssignWorkModal,
    checkEmployee,
    setCheckEmployee,
    technicians,
    setTechnicians,
    techniciansWorkToo,
    setCheckEmployeeWorkToo,
    handleCloseModal,
    handleAssignWorkInModal,
    handleGetDetailWork,
    handleGetJob,
    isApprove,
    isDone,
    isActionTpDone,
    isAdmin,
    handleActionJob,
    showRejectModal,
    handleShowRejectModal,
    handleHideRejectModal,
    handleBack,
    handleNavigateAddSupplies,
    handleOpenCamera,
    handleOpenPhoto,
    mediaResponse,
    removeMedia,
    reasonsNotCompleting,
    desc,
    handleChangeReason,
    handleChangeDesc,
    handleDoneJob,
    isMaintenance,
    openLibrary,
  } = useDetailRepair();

  if (skelenton) {
    return (
      <BasePage
        onBackPress={handleBack}
        onRefresh={() => {}}
        edges={['bottom']}
        title="Chi tiết công việc"
        showBack
        paddingHorizontal={0}
        containerStyle={{ flex: 1 }}
      >
        <JobDetailSkeleton />
      </BasePage>
    );
  }

  const detail = dataDetailJob?.data;

  return (
    <BasePage edges={['bottom']} paddingHorizontal={0}>
      <BasePage
        bottomOffset={Platform.OS === 'android' ? 100 : 30}
        onRefresh={handleGetDetailWork}
        refreshing={skelenton}
        scrollable
        title="Chi tiết công việc"
        showBack
        paddingHorizontal={16}
        containerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps={
          visibleAssignWorkModal ? 'always' : 'handled'
        }
        actions={
          detail?.state.state === 'processing' && (
            <TouchableOpacity onPress={handleNavigateAddSupplies}>
              <Icon name="add-circle" size={24} color="white" />
            </TouchableOpacity>
          )
        }
      >
        <SizeBox height={16} />

        <HeaderComponent
          detail={detail}
          onOpenAssignModal={() => {
            setVisibleAssignWorkModal(true);
          }}
          onGetJob={handleGetJob}
        />

        <SizeBox height={22} />

        <SuppliesComponent detail={detail} />

        {isMaintenance ? (
          <View>
            {detail?.list_project_task_ids.list_project_task_ids &&
              detail?.list_project_task_ids.list_project_task_ids.length >
                0 && (
                <ChecklistComponent
                  isDoneButton={isDone}
                  data={detail?.list_project_task_ids.list_project_task_ids}
                />
              )}
          </View>
        ) : (
          <Fragment>
            <SizeBox height={8} />

            {detail?.state.state === 'processing' && (
              <Fragment>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ fontWeight: '700' }}>Thêm hình ảnh</Text>
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
                <SizeBox height={28} />
              </Fragment>
            )}

            {detail?.list_image_request?.list_image_request &&
              detail?.list_image_request?.list_image_request.length > 0 && (
                <Fragment>
                  <SizeBox height={16} />
                  <Section icon="photo" title="Hiện trạng lỗi" marginTop={0} />

                  <SizeBox height={8} />

                  <View style={styles.imageGrid}>
                    {detail?.list_image_request?.list_image_request.map(
                      (item, index) => {
                        const isImage = /\.(jpe?g|png|gif|webp)$/i.test(
                          item.image_url,
                        );
                        return (
                          <View key={index}>
                            {isImage ? (
                              <View style={styles.imageWrapper}>
                                <Image
                                  source={{
                                    uri: item.image_url,
                                  }}
                                  style={styles.imageChecklist}
                                />
                              </View>
                            ) : (
                              <View key={index} style={styles.imageWrapper}>
                                <Video
                                  style={[
                                    styles.imageChecklist,
                                    { overflow: 'hidden' },
                                  ]}
                                  source={{ uri: item.image_url }}
                                  muted
                                  repeat
                                  resizeMode="cover"
                                />
                              </View>
                            )}
                          </View>
                        );
                      },
                    )}
                  </View>
                </Fragment>
              )}

            {detail?.state.state === 'processing' &&
              mediaResponse.length > 0 && (
                <Fragment>
                  <SizeBox height={16} />
                  <Section
                    icon="photo"
                    title="Kết quả thực hiện"
                    marginTop={0}
                  />

                  <SizeBox height={8} />

                  <View style={styles.imageGrid}>
                    {mediaResponse.map((item, index) =>
                      item.type === 'photo' ? (
                        <View key={index} style={styles.imageWrapper}>
                          <Image
                            source={{
                              uri: item.url,
                            }}
                            style={styles.imageChecklist}
                          />
                          <Pressable
                            style={styles.removeBtn}
                            onPress={() => removeMedia(index)}
                          >
                            <Icon name="close" size={14} color="white" />
                          </Pressable>
                        </View>
                      ) : (
                        <View key={index} style={styles.imageWrapper}>
                          <Video
                            style={[
                              styles.imageChecklist,
                              { overflow: 'hidden' },
                            ]}
                            source={{ uri: item.url }}
                            muted
                            repeat
                            resizeMode="cover"
                          />
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
                </Fragment>
              )}

            {detail?.list_image_order?.list_image_order &&
              detail?.list_image_order?.list_image_order?.length > 0 && (
                <Fragment>
                  <Section
                    icon="photo"
                    title="Kết quả thực hiện"
                    marginTop={0}
                  />

                  <SizeBox height={8} />

                  <View style={styles.imageGrid}>
                    {detail?.list_image_order?.list_image_order.map(
                      (item, index) => {
                        const isImage = /\.(jpe?g|png|gif|webp)$/i.test(
                          item.image_url,
                        );
                        return (
                          <View key={index}>
                            {isImage ? (
                              <View style={styles.imageWrapper}>
                                <Image
                                  source={{
                                    uri: item.image_url,
                                  }}
                                  style={styles.imageChecklist}
                                />
                              </View>
                            ) : (
                              <View key={index} style={styles.imageWrapper}>
                                <Video
                                  style={[
                                    styles.imageChecklist,
                                    { overflow: 'hidden' },
                                  ]}
                                  source={{ uri: item.image_url }}
                                  muted
                                  repeat
                                  resizeMode="cover"
                                />
                              </View>
                            )}
                          </View>
                        );
                      },
                    )}
                  </View>
                </Fragment>
              )}

            <SizeBox height={24} />

            {detail?.state.state === 'processing' && (
              <View>
                <View>
                  <Text style={{ fontWeight: '600' }}>
                    Lý do hoàn thành không đúng hạn
                  </Text>
                  <SizeBox height={8} />
                  <TextInput
                    value={reasonsNotCompleting}
                    placeholder="Nhập lý do..."
                    multiline
                    onChangeText={handleChangeReason}
                    placeholderTextColor={'#888'}
                    style={[
                      {
                        backgroundColor: '#fff',
                        paddingHorizontal: 14,
                        borderRadius: 14,
                        borderWidth: 1,
                        borderColor: '#ddd',
                        marginBottom: 12,
                        height: 90,
                        verticalAlign: 'top',
                      },
                    ]}
                  />
                </View>

                <View>
                  <Text style={{ fontWeight: '600' }}>Mô tả</Text>
                  <SizeBox height={8} />
                  <TextInput
                    value={desc}
                    placeholder="Nhập mô tả..."
                    multiline
                    onChangeText={handleChangeDesc}
                    placeholderTextColor={'#888'}
                    style={[
                      {
                        backgroundColor: '#fff',
                        paddingHorizontal: 14,
                        borderRadius: 14,
                        borderWidth: 1,
                        borderColor: '#ddd',
                        marginBottom: 12,
                        height: 95,
                        verticalAlign: 'top',
                      },
                    ]}
                  />
                </View>
              </View>
            )}
          </Fragment>
        )}

        <AssignWorkModal
          isVisible={visibleAssignWorkModal}
          onAssign={() => {}}
          onCloseModal={() => setVisibleAssignWorkModal(false)}
          dataItem={dataDetailJob}
          checkEmployee={checkEmployee}
          setCheckEmployee={setCheckEmployee}
          technicians={technicians}
          setTechnicians={setTechnicians}
          techniciansWorkToo={techniciansWorkToo}
          setCheckEmployeeWorkToo={setCheckEmployeeWorkToo}
          handleCloseModal={handleCloseModal}
          handleAssignWorkInModal={handleAssignWorkInModal}
        />

        <RejectReasonModal
          visible={showRejectModal}
          onClose={handleHideRejectModal}
          onConfirm={async reason => {
            await handleActionJob('action_tp_acceptance_cancel', reason);
          }}
        />
      </BasePage>
      {isDone && (
        <View style={styles.footer}>
          <Pressable
            style={styles.submitBtn}
            onPress={async () => {
              isMaintenance
                ? await handleActionJob('button_done')
                : await handleDoneJob();
            }}
          >
            <Icon name="done" size={22} color="white" />
            <AppText style={styles.submitText}>Hoàn thành</AppText>
          </Pressable>
        </View>
      )}

      {(isActionTpDone || isApprove) && isAdmin && (
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.footer, { flex: 1 }]}>
            <Pressable
              style={[styles.submitBtn, { backgroundColor: '#ef4444' }]}
              onPress={handleShowRejectModal}
            >
              <Icon name="cancel" size={22} color="white" />
              <AppText style={styles.submitText}>Huỷ</AppText>
            </Pressable>
          </View>
          <View style={[styles.footer, { flex: 1 }]}>
            <Pressable
              style={styles.submitBtn}
              onPress={async () => {
                await handleActionJob('action_tp_acceptance_done');
              }}
            >
              <Icon name="done" size={22} color="white" />
              <AppText style={styles.submitText}>Xác nhận</AppText>
            </Pressable>
          </View>
        </View>
      )}
    </BasePage>
  );
}
