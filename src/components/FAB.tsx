import React, { useState, useRef } from 'react';
import {
  View,
  Pressable,
  Animated,
  StyleSheet,
  Easing,
  Text,
} from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';
import { PRIMARY } from '@/utils/color';

type Props = {
  onNavigateCreateRepair?: () => void;
  onNavigateCreateIssue?: () => void;
};

export default function FabMenu({
  onNavigateCreateRepair,
  onNavigateCreateIssue,
}: Props) {
  const [open, setOpen] = useState(false);

  const scale1 = useRef(new Animated.Value(0)).current;
  const scale2 = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const openMenu = () => {
    setOpen(true);

    Animated.parallel([
      Animated.timing(scale1, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scale2, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0.3,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(scale1, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scale2, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => setOpen(false));
  };

  const toggleMenu = () => {
    open ? closeMenu() : openMenu();
  };

  const rotateIcon = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <>
      {/* overlay click outside */}
      {open && (
        <Pressable style={styles.overlay} onPress={closeMenu}>
          <Animated.View
            style={[styles.overlayBg, { opacity: overlayOpacity }]}
          />
        </Pressable>
      )}

      <View style={styles.container}>
        {/* action 2 */}
        <Pressable
          onPress={() => {
            onNavigateCreateIssue?.();
            toggleMenu();
          }}
        >
          <Animated.View
            style={[
              styles.action,
              {
                transform: [
                  { scale: scale2 },
                  {
                    translateY: scale2.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -110],
                    }),
                  },
                ],
              },
            ]}
          >
            <Icon name="report-problem" size={20} color="white" />
            <Text style={styles.label}>Tạo báo cáo</Text>
          </Animated.View>
        </Pressable>

        {/* action 1 */}
        <Pressable
          onPress={() => {
            onNavigateCreateRepair?.();
            toggleMenu();
          }}
        >
          <Animated.View
            style={[
              styles.action,
              {
                transform: [
                  { scale: scale1 },
                  {
                    translateY: scale1.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -60],
                    }),
                  },
                ],
              },
            ]}
          >
            <Icon name="description" size={20} color="white" />
            <Text style={styles.label}>Tạo yêu cầu sửa chữa</Text>
          </Animated.View>
        </Pressable>

        {/* FAB */}
        <Pressable style={styles.fab} onPress={toggleMenu}>
          <Animated.View style={{ transform: [{ rotate: rotateIcon }] }}>
            <Icon name="add" size={28} color="white" />
          </Animated.View>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    right: 12,
    alignItems: 'center',
  },

  fab: {
    width: 60,
    height: 60,
    borderRadius: 32,
    backgroundColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },

  action: {
    position: 'absolute',
    backgroundColor: PRIMARY,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    elevation: 4,

    minWidth: 180,
    alignSelf: 'flex-end',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
  },

  overlayBg: {
    flex: 1,
    backgroundColor: '#000',
  },
  label: {
    color: 'white',
    fontSize: 13,
    marginLeft: 6,
    fontWeight: '700',
  },
});
