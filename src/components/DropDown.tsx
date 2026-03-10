import Icon from '@react-native-vector-icons/material-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  // KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import AppInput from './AppInput';
// import Modal from 'react-native-modal';
export interface DropdownAppType {
  id: any;
  value: string;
}

interface Props {
  label: string;
  value: string | undefined;
  options: DropdownAppType[];
  onChange: (val: DropdownAppType | null) => void;
  disable?: boolean;
}

export default function Dropdown({
  label,
  value,
  options,
  onChange,
  disable = false,
}: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.label}>{label}</Text>

      <Pressable
        style={styles.input}
        onPress={() => {
          if (disable) {
            return;
          }
          setVisible(true);
        }}
      >
        <Text
          style={{ color: value ? '#000' : '#888', flex: 1 }}
          numberOfLines={1}
        >
          {value || 'Chọn'}
        </Text>
        {disable ? (
          <></>
        ) : (
          <>
            {value ? (
              <Pressable
                onPress={() => {
                  onChange(null);
                }}
              >
                <Icon name="close" size={22} />
              </Pressable>
            ) : (
              <Icon name="keyboard-arrow-down" size={22} />
            )}
          </>
        )}
      </Pressable>

      <ModalDropdown
        options={options}
        onChange={onChange}
        visible={visible}
        onVisible={() => {
          if (visible) {
            setVisible(false);
          } else {
            setVisible(true);
          }
        }}
      />
    </View>
  );
}

interface PropsModal {
  options: DropdownAppType[];
  onChange: (val: DropdownAppType | null) => void;
  visible: boolean;
  onVisible: () => void;
}
export const ModalDropdown = ({
  options,
  onChange,
  visible,
  onVisible,
}: PropsModal) => {
  const [search, setSearch] = useState('');

  const filteredOptions = options.filter(item =>
    item?.value?.toLowerCase()?.includes(search.toLowerCase()),
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      presentationStyle="overFullScreen"
    >
      <View style={styles.modalContainer}>
        <Pressable style={styles.overlay} onPress={onVisible} />

        <KeyboardAvoidingView
          behavior={'padding'}
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
              removeClippedSubviews={false}
              data={filteredOptions}
              keyExtractor={item => item.id.toString()}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.option}
                  onPress={() => {
                    onChange(item);
                    onVisible();
                  }}
                >
                  <Text>{item.value}</Text>
                </Pressable>
              )}
            />
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
});
