import Icon from '@react-native-vector-icons/material-icons';
import React from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './styles';
import { BasePage } from '@/components';
import { PRIMARY } from '@/utils/color';
import useMarkBroken from './hooks/useMarkBroken';
import moment from 'moment';

export default function MarkBrokenScreen() {
  const {
    assetData,
    lineAsset,
    totalDamaged,
    removeItem,
    updateBrokenQty,
    updateReason,
    desciption,
    setDesciption,
    handleSaveBroken,
  } = useMarkBroken();

  return (
    <BasePage
      title="Đánh dấu hỏng"
      showBack
      paddingHorizontal={0}
      scrollable
      edges={['bottom']}
    >
      <View style={styles.card}>
        <View style={styles.sectionTitleRow}>
          <Icon name="description" size={20} color={PRIMARY} />
          <Text style={styles.sectionTitle}>Thông tin phiếu</Text>
        </View>

        <InfoRow label="Người tạo phiếu" value={assetData?.employee.name} />
        <InfoRow label="Chức vụ" value={assetData?.job.name} />
        <InfoRow label="Mã tài sản" value={assetData?.code} />
        <InfoRow label="Tên tài sản" value={assetData?.name} multiline />
        <InfoRow label="Ngày đánh dấu" value={moment().format('DD-MM-YYYY')} />
        <InfoRow label="Tổng số lượng hỏng" value={totalDamaged} />
      </View>

      <View style={styles.inputSection}>
        <Text style={[styles.label, { marginTop: 16 }]}>Mô tả</Text>

        <TextInput
          value={desciption}
          onChangeText={setDesciption}
          style={styles.textArea}
          multiline
          placeholder="Nhập mô tả chi tiết tình trạng hỏng..."
        />
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Danh sách tài sản</Text>
      </View>

      {lineAsset?.map((item, index) => {
        return (
          <AssetItem
            key={item.id}
            location={item.location.name}
            department={item.asset_user}
            status={item.state}
            total={item.quantity}
            broken={item.damaged_quantity.toString()}
            onRemove={() => removeItem(index)}
            reasonBreak={item.damaged_reason}
            onChangeBroken={(v: string) => updateBrokenQty(index, v)}
            onChangeReason={(v: string) => updateReason(index, v)}
          />
        );
      })}

      {/* SUBMIT */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleSaveBroken}>
        <Icon name="save" size={20} color="white" />
        <Text style={styles.submitText}>Lưu thông báo hỏng</Text>
      </TouchableOpacity>
    </BasePage>
  );
}

const InfoRow = ({ label, value, multiline }: any) => (
  <View style={[styles.infoRow, multiline && { alignItems: 'flex-start' }]}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const AssetItem = ({
  location,
  department,
  status,
  total,
  broken,
  onRemove,
  reasonBreak,
  onChangeBroken,
  onChangeReason,
}: any) => (
  <View style={styles.assetCard}>
    <TouchableOpacity style={styles.removeBtn} onPress={onRemove}>
      <Icon name="close" size={20} color="#888" />
    </TouchableOpacity>

    <View style={styles.locationRow}>
      <Icon name="location-on" size={18} color={PRIMARY} />

      <View>
        <Text style={styles.locationLabel}>VỊ TRÍ</Text>
        <Text style={styles.locationValue}>{location}</Text>
      </View>
    </View>

    <View style={styles.grid}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <InfoBlock label="Đối tượng sử dụng" value={department} />
        <InfoBlock label="Tình trạng" value={status} highlight />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <InfoBlock label="Số lượng hiện có" value={total} bold />
        <View>
          <Text style={styles.blockLabel}>Số lượng hỏng</Text>
          <TextInput
            style={styles.smallInput}
            keyboardType="numeric"
            defaultValue={broken}
            onChangeText={onChangeBroken}
          />
        </View>
      </View>

      <View>
        <Text style={styles.blockLabel}>Lý do hỏng</Text>
        <TextInput
          style={styles.reasonBreak}
          defaultValue={reasonBreak}
          onChangeText={onChangeReason}
        />
      </View>
    </View>
  </View>
);

const InfoBlock = ({ label, value, highlight, bold }: any) => (
  <View>
    <Text style={styles.blockLabel}>{label}</Text>
    <Text
      style={[
        styles.blockValue,
        highlight && { color: '#f59e0b' },
        bold && { fontWeight: '700' },
      ]}
    >
      {value}
    </Text>
  </View>
);
