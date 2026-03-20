import { PRIMARY } from '@/utils/color';
import Icon from '@react-native-vector-icons/material-icons';
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { InventoryLine } from '../hooks/useScanQrInventory';

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: (data: StatusState) => void;
  data: InventoryLine | undefined;
}

type StatusState = {
  unused: number;
  using: number;
  broken: number;
  liquidate: number;
  inventoryLineId: number;
};

export default function ModalAssetStatus({
  visible,
  onClose,
  onConfirm,
  data,
}: Props) {
  const [state, setState] = useState<StatusState>({
    unused: data?.quantity_unused ?? 0,
    using: data?.quantity_using ?? 0,
    broken: data?.quantity_damaged ?? 0,
    liquidate: data?.quantity_liquidation ?? 0,
    inventoryLineId: data?.inventory_line_id ?? 0,
  });

//   console.log('data', data);

  useEffect(() => {
    if (data) {
      setState({
        unused: data.quantity_unused ?? 0,
        using: data.quantity_using ?? 0,
        broken: data.quantity_damaged ?? 0,
        liquidate: data.quantity_liquidation ?? 0,
        inventoryLineId: data?.inventory_line_id ?? 0,
      });
    }
  }, [data]);

  const update = (key: keyof StatusState, delta: number) => {
    setState(prev => {
      const newValue = Math.max(0, prev[key] + delta);

      const newState = {
        ...prev,
        [key]: newValue,
      };

      const newTotal =
        newState.unused + newState.using + newState.broken + newState.liquidate;

      if (newTotal > (data?.quantity_total ?? 0)) {
        return prev;
      }

      return newState;
    });
  };

  const total = state.unused + state.using + state.broken + state.liquidate;

  const renderItem = (label: string, key: keyof StatusState, color: string) => (
    <View style={styles.row}>
      <View style={styles.left}>
        <View style={[styles.dot, { backgroundColor: color }]} />
        <Text style={styles.label}>{label}</Text>
      </View>

      <View style={styles.counter}>
        <Pressable onPress={() => update(key, -1)} style={styles.btn}>
          <Icon name="remove" size={16} color="#666" />
        </Pressable>

        <Text style={styles.value}>{state[key]}</Text>

        <Pressable onPress={() => update(key, 1)} style={styles.btn}>
          <Icon name="add" size={16} color="#666" />
        </Pressable>
      </View>
    </View>
  );

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.container}>
        {/* overlay */}
        <Pressable style={styles.overlay} onPress={onClose} />

        {/* modal content */}
        <View style={styles.modal}>
          {/* header */}
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={3}>
              {data?.asset_code} {data?.asset_name}
            </Text>

            <Pressable onPress={onClose}>
              <Icon name="close" size={22} color="#444" />
            </Pressable>
          </View>

          {/* content */}
          <View style={styles.content}>
            {renderItem('Chưa sử dụng', 'unused', '#c5c5d9')}
            {renderItem('Đang sử dụng', 'using', '#f59e0b')}
            {renderItem('Đã hỏng', 'broken', '#1337ec')}
            {renderItem('Đề nghị thanh lý', 'liquidate', '#666')}
          </View>

          {/* total */}
          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>TỔNG SỐ</Text>
            <Text style={styles.totalValue}>
              {total}/{data?.quantity_total}
            </Text>
          </View>

          {/* button */}
          <Pressable style={styles.confirmBtn} onPress={() => onConfirm(state)}>
            <Text style={styles.confirmText}>XÁC NHẬN</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  modal: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  title: {
    flex: 1,
    fontWeight: '700',
    fontSize: 16,
    marginRight: 10,
  },

  content: {
    gap: 14,
    marginBottom: 16,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
  },

  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f9',
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  btn: {
    padding: 6,
  },

  value: {
    width: 30,
    textAlign: 'center',
    fontWeight: '700',
  },

  totalBox: {
    backgroundColor: '#f1f3f9',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'center',
  },

  totalLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
  },

  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: PRIMARY,
  },

  confirmBtn: {
    height: 48,
    borderRadius: 10,
    backgroundColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },

  confirmText: {
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 1,
  },
});
