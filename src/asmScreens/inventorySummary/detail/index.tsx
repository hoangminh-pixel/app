import { PRIMARY } from '@/utils/color';
import Icon from '@react-native-vector-icons/material-icons';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Detail, DiffAsset } from '../hooks/useSummary';
import { BasePage } from '@/components';

type Props = {
  data: DiffAsset | undefined;
  inventoried: boolean;
  handleCompleteInventory: () => void;
};
export default function DetailInventory({
  data,
  inventoried,
  handleCompleteInventory,
}: Props) {
  const renderItem = ({ item }: { item: Detail }) => {
    return (
      <Pressable style={styles.item}>
        <View style={styles.left}>
          <View>
            <Text style={styles.name}>{item.asset_name}</Text>
          </View>
        </View>

        <View style={styles.right}>
          <View style={[styles.badge]}>
            <Text style={[styles.badgeText]}>
              {item.real_qty_total}/{item.theory_qty_total}
            </Text>
          </View>

          <Icon name={'check-circle'} size={20} color={PRIMARY} />
        </View>
      </Pressable>
    );
  };

  return (
    <BasePage edges={['bottom']}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data?.detail}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {!inventoried && (
        <Pressable
          style={[styles.button, { marginHorizontal: 16 }]}
          onPress={handleCompleteInventory}
        >
          <Icon name="check-circle" size={20} color="#fff" />
          <Text style={styles.buttonText}>HOÀN TẤT KIỂM KÊ</Text>
        </Pressable>
      )}
    </BasePage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },

  separator: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f1f3f9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  name: {
    fontWeight: '700',
    fontSize: 14,
  },

  code: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },

  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },

  badgeDone: {
    backgroundColor: 'rgba(19,55,236,0.1)',
  },

  badgeError: {
    backgroundColor: 'rgba(239,68,68,0.1)',
  },

  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  button: {
    marginTop: 24,
    height: 56,
    borderRadius: 12,
    backgroundColor: PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 1,
  },
});
