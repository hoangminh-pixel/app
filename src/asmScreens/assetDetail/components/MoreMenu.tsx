import React, { useRef, useState } from 'react';
import { View, Pressable, Modal, Text, StyleSheet } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';

type Props = {
  onPressMarkBroken: () => void;
  onPressMarkLoss: () => void;
};

export default function MoreMenu({
  onPressMarkBroken,
  onPressMarkLoss,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const iconRef = useRef<View>(null);

  const openMenu = () => {
    iconRef.current?.measure((fx, fy, width, height, px, py) => {
      setPos({
        x: px,
        y: py + height,
      });
      setVisible(true);
    });
  };

  const hideMenu = () => setVisible(false);

  return (
    <View>
      {/* ICON */}
      <Pressable ref={iconRef} onPress={openMenu} style={styles.iconBtn}>
        <MaterialIcons name="more-vert" size={24} color="white" />
      </Pressable>

      {/* POPOVER */}
      <Modal transparent visible={visible}>
        <Pressable style={styles.overlay} onPress={hideMenu}>
          <View
            style={[
              styles.menu,
              {
                position: 'absolute',
                top: pos.y,
                right: 25,
              },
            ]}
          >
            <Pressable
              style={styles.item}
              onPress={() => {
                hideMenu();
                onPressMarkBroken();
              }}
            >
              <Text style={{ fontWeight: '600' }}>Đánh dấu hỏng</Text>
            </Pressable>

            <Pressable
              style={styles.item}
              onPress={() => {
                hideMenu();
                onPressMarkLoss();
              }}
            >
              <Text style={{ fontWeight: '600' }}>Đánh dấu mất</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  iconBtn: {
    padding: 8,
    borderRadius: 20,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },

  menu: {
    width: 160,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 6,

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },

  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
