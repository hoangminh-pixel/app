import Icon from '@react-native-vector-icons/material-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ScanQrCodeInfor } from '../hooks/useScanQrInventory';
import { screenHeight } from '@/utils/appConstant';

interface Props {
  visible: boolean;
  data: ScanQrCodeInfor[];
  onClose: () => void;
  onSelect: (item: ScanQrCodeInfor) => void;
}

export default function BottomSheetSelectObject({
  visible,
  data,
  onClose,
  onSelect,
}: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      presentationStyle="overFullScreen"
    >
      <View style={styles.container}>
        {/* overlay */}
        <Pressable style={styles.overlay} onPress={onClose} />

        <View style={styles.sheet}>
          {/* HEADER */}
          <View style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Pressable onPress={onClose}>
                <Icon name="close" size={22} color="#1337ec" />
              </Pressable>

              <Text style={styles.title}>Chọn đối tượng sử dụng</Text>
            </View>
          </View>

          {/* LIST */}
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
            renderItem={({ item }) => {
              const isSelected = selectedId === item.id;

              return (
                <Pressable
                  // onPress={() => setSelectedId(item.id)}
                  onPress={() => {
                    onClose();
                    onSelect(item);
                  }}
                  // style={[styles.item, isSelected && styles.itemActive]}
                  style={styles.item}
                >
                  {/* radio */}
                  <View style={styles.radio}>
                    {/* {isSelected && <View style={styles.radioDot} />} */}
                    <View style={styles.radioDot} />
                  </View>

                  {/* content */}
                  <View style={{ flex: 1 }}>
                    <Text style={styles.itemTitle}>
                      {item.asset_user === 'none'
                        ? 'Chưa có đối tượng sử dụng'
                        : item.asset_user === 'employee'
                        ? item.employee.name
                        : item.department.name}
                    </Text>
                    <Text style={styles.itemDesc}>
                      {item.asset_user === 'none'
                        ? 'Chưa có đối tượng sử dụng'
                        : item.asset_user === 'employee'
                        ? item.department.name
                        : item.representative.name}
                    </Text>
                  </View>
                </Pressable>
              );
            }}
          />

          {/* FOOTER */}
          {/* <View style={styles.footer}>
            <Pressable style={styles.cancelBtn} onPress={onClose}>
              <Icon name="close" size={18} color="#999" />
              <Text style={styles.cancelText}>Hủy</Text>
            </Pressable>

            <Pressable
              style={styles.confirmBtn}
              onPress={() => {
                const selected = data.find(i => i.id === selectedId);
                if (selected) {
                  onSelect(selected);
                  onClose();
                }
              }}
            >
              <Icon name="check-circle" size={18} color="#1337ec" />
              <Text style={styles.confirmText}>Xác nhận</Text>
            </Pressable>
          </View> */}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: screenHeight - 200,
  },

  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  title: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
  },

  itemActive: {
    backgroundColor: '#f1f3f9',
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#1337ec',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1337ec',
  },

  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },

  itemDesc: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },

  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingVertical: 10,
    justifyContent: 'space-around',
  },

  cancelBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelText: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },

  confirmBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  confirmText: {
    fontSize: 12,
    color: '#1337ec',
    marginTop: 2,
    fontWeight: '600',
  },
});
