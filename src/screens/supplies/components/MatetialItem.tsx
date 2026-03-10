import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { styles } from '../styles';
import { AppText } from '@/components';
import { ModalDropdown } from '@/components/DropDown';
import { RootSuppliesAdded } from '../hooks/useSupplies';
import Icon from '@react-native-vector-icons/material-icons';

export function MaterialItem({
  item,
  index,
  listSuppliesModal,
  changeMaterial,
  increaseQty,
  decreaseQty,
}: any) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.image} />

      <View style={{ flex: 1 }}>
        <Pressable
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => setOpenModal(true)}
        >
          <AppText style={styles.name}>{item.name || 'Chọn vật tư'}</AppText>

          <Icon name="arrow-drop-down" size={22} color="#6b7280" />
        </Pressable>

        <AppText style={styles.unit}>Đơn vị: {item.product_uom || ''}</AppText>
      </View>

      <View style={styles.qtyBox}>
        <Pressable onPress={() => decreaseQty(index)}>
          <Icon name="remove" size={18} color="#1337ec" />
        </Pressable>

        <AppText style={styles.qty}>{item.count}</AppText>

        <Pressable onPress={() => increaseQty(index)}>
          <Icon name="add" size={18} color="#1337ec" />
        </Pressable>
      </View>

      <ModalDropdown
        options={listSuppliesModal}
        visible={openModal}
        onVisible={() => setOpenModal(!openModal)}
        onChange={it => {
          changeMaterial(it?.id, index);
          setOpenModal(false);
        }}
      />
    </View>
  );
}

export function MaterialItemAdded({ item }: { item: RootSuppliesAdded }) {
  return (
    <View style={styles.container}>
      <View style={styles.image} />

      <View style={{ flex: 1 }}>
        <AppText style={styles.name}>
          {item.parts_id.name || 'Chọn vật tư'}
        </AppText>

        <AppText style={styles.unit}>
          Đơn vị: {item.parts_uom.parts_uom || ''}
        </AppText>
      </View>

      <View style={styles.qtyBox}>
        <AppText style={styles.qty}>{item.parts_qty.quant_qty}</AppText>
      </View>
    </View>
  );
}
