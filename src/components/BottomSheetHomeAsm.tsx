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
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import AppInput from './AppInput';

interface BusinessUnit {
  id: number;
  name: string;
  business_unit: {
    id: number;
    name: string;
  }[];
}

interface Props {
  visible: boolean;
  data: BusinessUnit[];
  onClose: () => void;
  onSelect: (item: any) => void;
}

export default function BottomSheetBusiness({
  visible,
  data,
  onClose,
  onSelect,
}: Props) {
  const [search, setSearch] = useState('');

  const filterData = data
    .map(group => ({
      ...group,
      business_unit: group.business_unit.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      ),
    }))
    .filter(
      group =>
        group.name.toLowerCase().includes(search.toLowerCase()) ||
        group.business_unit.length > 0,
    );

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
              <Text style={styles.title}>Đơn vị quản lý</Text>
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

            {/* list */}
            <FlatList
              data={filterData}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={{ padding: 16 }}
              renderItem={({ item }) => (
                <View style={{ marginBottom: 16 }}>
                  {/* group */}
                  <View style={styles.groupRow}>
                    <Icon name="business" size={20} color="#2563eb" />
                    <Text style={styles.groupTitle}>{item.name}</Text>
                  </View>

                  {/* children */}
                  <View style={styles.childContainer}>
                    {item.business_unit.map(child => (
                      <Pressable
                        key={child.id}
                        style={styles.childItem}
                        onPress={() => {
                          const data = {
                            id: item.id,
                            name: item.name,
                            business_unit: {
                              id: child.id,
                              name: child.name,
                            },
                          };
                          onSelect(data);
                          onClose();
                        }}
                      >
                        <Text style={styles.childText}>{child.name}</Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
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
    maxHeight: 400,
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
    flexDirection: 'row',
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
