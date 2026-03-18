import Icon from '@react-native-vector-icons/material-icons';
import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './styles';
import { BasePage } from '@/components';
import { PRIMARY } from '@/utils/color';
import useMarkLost from './hooks/useMarkLost';
import moment from 'moment';
import SizeBox from '@/components/SizeBox';

export default function MarkLostScreen() {
  const {
    assetData,
    lineAsset,
    totalLost,
    removeItem,
    updateBrokenQty,
    updateReason,
    handleSaveBroken,
    desciption,
    setDesciption,
    formatMoney,
    parseMoney,
    updateOriginalValue,
    updateRemainValue,
    updateNote,
    updateCompensation,
  } = useMarkLost();

  return (
    <BasePage
      title="Đánh dấu mất"
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
        <InfoRow label="Tổng số lượng mất" value={totalLost} />
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
            index={index}
            item={item}
            key={item.id}
            location={item.location.name}
            department={item.asset_user}
            status={item.state}
            total={item.quantity}
            lost={item.lost_quantity.toString()}
            onRemove={() => removeItem(index)}
            reasonLost={item.lost_reason}
            onChangeLost={(v: string) => updateBrokenQty(index, v)}
            onChangeReason={(v: string) => updateReason(index, v)}
            formatMoney={formatMoney}
            updateOriginalValue={updateOriginalValue}
            updateRemainValue={updateRemainValue}
            updateCompensation={updateCompensation}
            updateNote={updateNote}
            isDepreciated={!assetData?.is_depreciated}
          />
        );
      })}

      {/* SUBMIT */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleSaveBroken}>
        <Icon name="save" size={20} color="white" />
        <Text style={styles.submitText}>Báo mất</Text>
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
  lost,
  onRemove,
  reasonLost,
  onChangeLost,
  onChangeReason,
  formatMoney,
  item,
  updateOriginalValue,
  index,
  updateRemainValue,
  updateCompensation,
  updateNote,
  isDepreciated,
}: any) => {
  const [expanded, setExpanded] = useState(false);

  return (
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
        <View style={styles.row}>
          <InfoBlock label="Đối tượng sử dụng" value={department} />
          <InfoBlock label="Tình trạng" value={status} highlight />
        </View>

        <View style={styles.row}>
          <InfoBlock label="SL hiện có" value={total} bold />

          <View style={{}}>
            <Text style={styles.blockLabel}>Số lượng mất</Text>
            <TextInput
              style={[styles.input]}
              keyboardType="numeric"
              value={lost}
              onChangeText={onChangeLost}
            />
          </View>
        </View>
      </View>

      {expanded && (
        <View style={styles.grid}>
          <SizeBox height={1} />
          <View style={styles.row}>
            <View style={styles.flex1}>
              <Text style={styles.blockLabel}>Giá trị ban đầu</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                editable={isDepreciated}
                value={formatMoney(item.original_value || '')}
                onChangeText={v => updateOriginalValue(index, v)}
              />
            </View>

            <View style={styles.flex1}>
              <Text style={styles.blockLabel}>Giá trị còn lại</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={formatMoney(item.residual_value || '')}
                onChangeText={v => updateRemainValue(index, v)}
              />
            </View>

            <View style={styles.flex1}>
              <Text style={styles.blockLabel}>Giá trị đền bù</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={formatMoney(item.compensation_value || '')}
                onChangeText={v => updateCompensation(index, v)}
              />
            </View>
          </View>

          {/* reason */}
          <View>
            <Text style={styles.blockLabel}>Lý do mất</Text>
            <TextInput
              style={styles.textArea}
              value={reasonLost}
              onChangeText={onChangeReason}
              // multiline
            />
          </View>

          {/* note */}
          <View>
            <Text style={styles.blockLabel}>Ghi chú</Text>
            <TextInput
              style={styles.textArea}
              value={item?.note}
              onChangeText={v => updateNote(index, v)}
            />
          </View>
        </View>
      )}

      <Pressable onPress={() => setExpanded(prev => !prev)}>
        <View style={styles.expandIconWrap}>
          <Icon
            name={expanded ? 'expand-less' : 'expand-more'}
            size={24}
            color="#64748b"
          />
        </View>
      </Pressable>
    </View>
  );
};

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
