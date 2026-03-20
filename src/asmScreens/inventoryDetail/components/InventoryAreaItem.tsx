import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';
import { PRIMARY } from '@/utils/color';

interface Props {
  name: string;
  subTitle: string;
  done: number;
  total: number;
  status?: 'done' | 'pending';
  onPress?: () => void;
}

export default function InventoryAreaItem({
  name,
  subTitle,
  done,
  total,
  status = 'done',
  onPress,
}: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.iconBox}>
          <Icon name={'inventory-2'} size={22} color={PRIMARY} />
        </View>

        {/* content */}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {name}
          </Text>
        </View>
      </View>

      {/* right value */}
      <View>
        <Text style={styles.value}>
          {done}/{total}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,

    position: 'relative',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',

    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 2,
  },

  subTitle: {
    fontSize: 11,
    color: '#64748b',
  },

  value: {
    fontSize: 16,
    fontWeight: '800',
    color: PRIMARY,
  },

  statusWrapper: {
    position: 'absolute',
    top: 8,
    right: 8,

    backgroundColor: 'rgba(17,194,109,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },

  statusText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#11c26d',
  },
});
