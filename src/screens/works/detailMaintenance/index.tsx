import { AppText, BasePage } from '@/components';
import SizeBox from '@/components/SizeBox';
import { RootDetailJob } from '@/services/workRepair';
import React, { Fragment } from 'react';
import { Platform, Pressable, TouchableOpacity, View } from 'react-native';
import AssignWorkModal from '../maintenance/components/AssignWorkModal';
import { ChecklistComponent } from './components/Checklist';
import { HeaderComponent } from './components/Header';
import JobDetailSkeleton from './components/SkeletonUI';
import { SuppliesComponent } from './components/Supplies';
import useDetailMaintanence from './hooks/useDetailMaintanence';
import { styles } from './styles';
import Icon from '@react-native-vector-icons/material-icons';
import RejectReasonModal from '@/components/RejectModal';

export default function DetailMaintenanceScreen() {
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
  } = useDetailMaintanence();

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
        // edges={['bottom']}
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

        {detail?.list_project_task_ids.list_project_task_ids &&
          detail?.list_project_task_ids.list_project_task_ids.length > 0 && (
            <ChecklistComponent
              isDoneButton={isDone}
              data={detail?.list_project_task_ids.list_project_task_ids}
            />
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
              await handleActionJob('button_done');
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
