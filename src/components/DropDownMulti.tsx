import Icon from '@react-native-vector-icons/material-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import AppInput from './AppInput';

export interface DropdownAppType {
  id: any;
  value: string;
}

interface PropsMulti {
  label: string;
  values: DropdownAppType[];
  options: DropdownAppType[];
  onChange: (vals: DropdownAppType[]) => void;
}

export function DropdownMulti({
  label,
  values,
  options,
  onChange,
}: PropsMulti) {
  const [visible, setVisible] = useState(false);

  const removeItem = (id: any) => {
    onChange(values.filter(v => v.id !== id));
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.label}>{label}</Text>

      <Pressable style={styles.input} onPress={() => setVisible(true)}>
        {values.length === 0 ? (
          <Text style={{ color: '#888' }}>Chọn</Text>
        ) : (
          <View style={styles.tagContainer}>
            {values.map(item => (
              <View key={item.id} style={styles.tag}>
                <Text style={styles.tagText}>{item.value}</Text>

                <Pressable onPress={() => removeItem(item.id)} hitSlop={10}>
                  <Icon name="close" size={16} color="#fff" />
                </Pressable>
              </View>
            ))}
          </View>
        )}

        <Icon name="keyboard-arrow-down" size={22} />
      </Pressable>

      <ModalMultiDropdown
        options={options}
        values={values}
        onChange={onChange}
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </View>
  );
}

interface PropsModalMulti {
  options: DropdownAppType[];
  values: DropdownAppType[];
  onChange: (vals: DropdownAppType[]) => void;
  visible: boolean;
  onClose: () => void;
}

const ModalMultiDropdown = ({
  options,
  values,
  onChange,
  visible,
  onClose,
}: PropsModalMulti) => {
  const [search, setSearch] = useState('');

  const filteredOptions = options.filter(item =>
    item.value.toLowerCase().includes(search.toLowerCase()),
  );

  const isSelected = (item: DropdownAppType) =>
    values.some(v => v.id === item.id);

  const toggleItem = (item: DropdownAppType) => {
    if (isSelected(item)) {
      onChange(values.filter(v => v.id !== item.id));
    } else {
      onChange([...values, item]);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      presentationStyle="overFullScreen"
    >
      <View style={styles.modalContainer}>
        <Pressable style={styles.overlay} onPress={onClose} />

        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === 'android' ? 50 : 0}
        >
          <View style={styles.modalContent}>
            <AppInput
              value={search}
              onChangeText={setSearch}
              inputHeight={45}
              leadingIcon="search"
              placeholder="Tìm kiếm..."
              placeholderTextColor="#999"
              trailingIcon={search ? 'close' : undefined}
              onPressTrailingIcon={() => setSearch('')}
            />

            <FlatList
              keyboardDismissMode="none"
              keyboardShouldPersistTaps="handled"
              data={filteredOptions}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const selected = isSelected(item);

                return (
                  <Pressable
                    style={styles.option}
                    onPress={() => toggleItem(item)}
                  >
                    <Text style={{ flex: 1 }}>{item.value}</Text>

                    {selected && (
                      <Icon name="check" size={20} color="#1337ec" />
                    )}
                  </Pressable>
                );
              }}
            />

            {values.length > 0 && (
              <Pressable style={styles.doneButton} onPress={onClose}>
                <Text style={{ color: '#fff' }}>Xong ({values.length})</Text>
              </Pressable>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

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
    maxHeight: 400,
  },
  option: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  doneButton: {
    marginTop: 12,
    backgroundColor: '#1337ec',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    gap: 6,
  },

  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1337ec',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 6,
  },

  tagText: {
    color: '#fff',
    marginRight: 6,
    fontSize: 13,
  },
});
