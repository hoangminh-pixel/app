import { PRIMARY } from '@/utils/color';
import { showErrorToast } from '@/utils/toast';
import { SCREEN_HEIGHT } from '@gorhom/bottom-sheet';
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
  Platform,
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

const RejectReasonModal = ({ visible, onClose, onConfirm }: Props) => {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    if (!reason) {
      showErrorToast({ content: 'Vui lòng nhập lý do!' });
      return;
    }
    onClose();
    onConfirm(reason);
    setReason('');
  };

  const handleClose = () => {
    setReason('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      {/* Overlay */}
      <Pressable style={styles.overlay} onPress={handleClose}>
        <Pressable style={styles.modalContainer}>
          <KeyboardAvoidingView behavior={'padding'}>
            {/* Handle */}
            <View style={styles.handleWrapper}>
              <View style={styles.handle} />
            </View>

            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Lý do từ chối</Text>
            </View>

            {/* Body */}
            <View style={styles.body}>
              <TextInput
                value={reason}
                onChangeText={setReason}
                placeholder="Vui lòng nhập lý do từ chối tại đây..."
                placeholderTextColor="#94a3b8"
                multiline
                style={styles.textarea}
              />
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleClose}
              >
                <Text style={styles.cancelText}>Hủy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmText}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default RejectReasonModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.6)', // slate-900/60
    //     justifyContent: 'center',
    //     alignItems: 'center',
    padding: 16,
    paddingTop: SCREEN_HEIGHT / 2 - 250,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  handleWrapper: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  handle: {
    width: 48,
    height: 6,
    borderRadius: 999,
    backgroundColor: '#e2e8f0',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  body: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#334155',
  },
  textarea: {
    height: 100,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#f8fafc',
    fontSize: 16,
    textAlignVertical: 'top',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    flex: 2,
    height: 48,
    borderRadius: 12,
    backgroundColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    fontWeight: '700',
    fontSize: 16,
  },
  confirmText: {
    fontWeight: '700',
    fontSize: 16,
    color: 'white',
  },
});
