import MaterialIcons from '@react-native-vector-icons/material-icons';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ModalView } from 'react-native-multiple-modals';
// import DropdownAssignWork from './DropdownAssignWork';
import Dropdown from '@/components/DropDown';
import SizeBox from '@/components/SizeBox';
import { PRIMARY } from '@/utils/color';

type AssignWorkModalProps = {
  isVisible: boolean;
  onAssign: () => void;
  onCloseModal: () => void;
};

const AssignWorkModal = ({
  isVisible,
  onAssign,
  onCloseModal,
}: AssignWorkModalProps) => {
  const STATUS_OPTIONS = [
    { id: 'all', value: 'Tất cả' },
    { id: 'tp_gv', value: 'QL giao việc' },
    { id: 'give', value: 'Nhận việc' },
    { id: 'processing', value: 'Đang thực hiện' },
    { id: 'wait_materials', value: 'Chờ vật tư' },
    { id: 'wait_tp_acceptance', value: 'Chờ QL nghiệm thu' },
    { id: 'done', value: 'Hoàn thành' },

    { id: 'alls', value: 'Tất cả' },
    { id: 'tp_gvs', value: 'QL giao việc' },
    { id: 'gives', value: 'Nhận việc' },
    { id: 'processings', value: 'Đang thực hiện' },
    { id: 'wait_materisals', value: 'Chờ vật tư' },
    { id: 'wait_tp_acceptsance', value: 'Chờ QL nghiệm thu' },
    { id: 'donse', value: 'Hoàn thành' },
  ];

  const colors = {
    bg: '#f6f6f8',
    card: '#ffffff',
    text: '#0f172a',
    sub: '#64748b',
    border: '#e2e8f0',
    primary: PRIMARY,
  };
  return (
    <View>
      {isVisible && (
        <ModalView
          animationType="fade"
          statusBar={{ translucent: true, barStyle: 'dark-content' }}
          backdropColor="rgba(0,0,0,0.5)"
          contentContainerStyle={{
            width: '100%',
            justifyContent: 'flex-end',
          }}
          onRequestDismiss={onCloseModal}
        >
          <View style={[styles.container, { backgroundColor: colors.bg }]}>
            <SizeBox height={20} />
            <View
              style={[
                styles.jobCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <View style={styles.jobIcon}>
                <MaterialIcons
                  name="assignment"
                  size={24}
                  color={colors.primary}
                />
              </View>

              <View style={{ flex: 1 }}>
                <View style={styles.jobTitleRow}>
                  <Text
                    style={[styles.jobTitle, { color: colors.text }]}
                    numberOfLines={1}
                  >
                    Checklist PCCC
                  </Text>

                  <MaterialIcons name="star" size={18} color="#f59e0b" />
                </View>

                <Text style={[styles.jobCode, { color: colors.sub }]}>
                  PMI.251219.95565
                </Text>
              </View>
            </View>

            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            >
              <InfoRow label="Vị trí" value="Khác" colors={colors} />
              <InfoRow
                label="Thời gian"
                value="11:03 24/02/2026"
                colors={colors}
              />
              <InfoRow label="Mô tả" value="Checklist PCCC" colors={colors} />
              <InfoRow
                label="Thiết bị"
                value="Tích áp - PCCC"
                colors={colors}
                isBadge
              />

              <SizeBox height={20} />

              <Dropdown
                label="Nhân viên kiểm tra"
                value={'priority'}
                options={[
                  {
                    id: 'id1',
                    value: 'Thấp1',
                  },
                  {
                    id: 's',
                    value: 'Thấp1',
                  },
                  {
                    id: 'a',
                    value: 'Thấp1',
                  },
                ]}
                onChange={() => {}}
              />

              <SizeBox height={8} />

              <Dropdown
                label="Kỹ thuật viên thực hiện"
                value={'priority'}
                options={[
                  {
                    id: 'id1',
                    value: 'Thấp1',
                  },
                  {
                    id: 's',
                    value: 'Thấp1',
                  },
                  {
                    id: 'a',
                    value: 'Thấp1',
                  },
                ]}
                onChange={() => {}}
              />

              <SizeBox height={8} />

              <Dropdown
                label="Kỹ thuật viên cùng thực hiện"
                value={'priority'}
                options={[
                  {
                    id: 'id1',
                    value: 'Thấp1',
                  },
                  {
                    id: 's',
                    value: 'Thấp1',
                  },
                  {
                    id: 'a',
                    value: 'Thấp1',
                  },
                ]}
                onChange={() => {}}
              />
            </ScrollView>

            <View
              style={[
                styles.footer,
                {
                  borderTopColor: colors.border,
                },
              ]}
            >
              <Pressable
                style={[styles.btnOutline, { borderColor: colors.border }]}
                onPress={onCloseModal}
              >
                <Text style={{ color: colors.text }}>Đóng</Text>
              </Pressable>

              <Pressable
                style={[styles.btnPrimary, { backgroundColor: colors.primary }]}
                onPress={onAssign}
              >
                <Text style={{ color: '#fff' }}>Giao việc</Text>
              </Pressable>
            </View>

            <SizeBox height={50} />
          </View>
        </ModalView>
      )}
    </View>
  );
};

const InfoRow = ({ label, value, colors, isBadge = false }: any) => (
  <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
    <Text style={{ color: colors.sub }}>{label}</Text>

    {isBadge ? (
      <View style={[styles.badge, { backgroundColor: colors.primary + '8' }]}>
        <Text style={{ color: colors.primary }}>{value}</Text>
      </View>
    ) : (
      <Text style={{ color: colors.text }}>{value}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    marginBottom: 6,
    color: '#444',
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000099',
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    maxHeight: 450,
  },
  option: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
    maxHeight: 550,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
  },

  jobCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },

  jobIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#1337ec20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  jobTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  jobTitle: {
    fontWeight: '600',
    fontSize: 16,
    flex: 1,
  },

  jobCode: {
    fontSize: 12,
    marginTop: 4,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },

  dropdownLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },

  dropdown: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 16,
    borderTopWidth: 1,
  },

  btnOutline: {
    flex: 1,
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 14,
    alignItems: 'center',
  },

  btnPrimary: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
});
export default AssignWorkModal;
