import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import AppInput from './AppInput';
import { AssetByLocation } from '@/asmScreens/scanQrInventory/hooks/useScanQrInventory';
import { screenHeight } from '@/utils/appConstant';

interface Props {
  visible: boolean;
  data: AssetByLocation[];
  onClose: () => void;
  onSelect: (item: AssetByLocation) => void;
}

export default function BottomSheetAssetLocation({
  visible,
  data,
  onClose,
  onSelect,
}: Props) {
  const [search, setSearch] = useState('');

  // const filterData = data
  //   .map(group => ({
  //     ...group,
  //     business_unit: group.business_unit.filter(item =>
  //       item.name.toLowerCase().includes(search.toLowerCase()),
  //     ),
  //   }))
  //   .filter(
  //     group =>
  //       group.name.toLowerCase().includes(search.toLowerCase()) ||
  //       group.business_unit.length > 0,
  //   );

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

        <KeyboardAvoidingView behavior="padding">
          <View style={styles.sheet}>
            {/* handle */}
            <View style={styles.handle} />

            {/* header */}
            <View style={styles.header}>
              <Text style={styles.title}>Danh sách tài sản</Text>
              <Pressable onPress={onClose}>
                <Text style={styles.cancel}>Hủy</Text>
              </Pressable>
            </View>

            {/* search */}
            <View style={{ paddingHorizontal: 16 }}>
              <AppInput
                value={search}
                onChangeText={setSearch}
                inputHeight={40}
                leadingIcon="search"
                placeholder="Tìm kiếm..."
                placeholderTextColor="#999"
                trailingIcon={search ? 'close' : undefined}
                onPressTrailingIcon={() => setSearch('')}
              />
            </View>

            <FlatList
              data={data}
              keyExtractor={item => item.asset_id.toString()}
              contentContainerStyle={{ padding: 16 }}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    onClose();
                    onSelect(item);
                  }}
                >
                  <View
                    style={{
                      marginBottom: 16,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View
                      style={[styles.groupRow, { alignItems: 'flex-start' }]}
                    >
                      <Text style={styles.groupTitle}>{item.asset_code}</Text>
                      <Text style={styles.groupTitle}>{item.asset_name}</Text>
                    </View>

                    <View style={styles.childContainer}>
                      <View style={styles.childItem}>
                        <Text style={styles.childText}>
                          {item.qty_inventoried}/{item.total_inventory}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              )}
            />
          </View>
        </KeyboardAvoidingView>
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
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: screenHeight - 200,
  },

  handle: {
    alignSelf: 'center',
    width: 40,
    height: 5,
    borderRadius: 10,
    backgroundColor: '#ddd',
    marginTop: 8,
    marginBottom: 10,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  cancel: {
    color: '#999',
    fontWeight: '500',
  },

  groupRow: {
    // flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  groupTitle: {
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 15,
  },

  childContainer: {
    marginLeft: 12,
    borderLeftWidth: 1,
    borderColor: '#eee',
    paddingLeft: 10,
  },

  childItem: {
    paddingVertical: 10,
    borderRadius: 8,
  },

  childText: {
    fontSize: 14,
    color: '#444',
  },

  bottomBar: {
    height: 5,
    width: 120,
    backgroundColor: '#eee',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 8,
  },
});
