import AppText from '@/components/AppText';
import BasePage from '@/components/BasePage';
import { ModalDropdown } from '@/components/DropDown';
import SizeBox from '@/components/SizeBox';
import { PRIMARY } from '@/utils/color';
import Icon from '@react-native-vector-icons/material-icons';
import React, { useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import useSupplies, { RootSuppliesAdded } from './hooks/useSupplies';
import { styles } from './styles';
import { MaterialItem, MaterialItemAdded } from './components/MatetialItem';
import AddSuppliesComponent from './components/AddSupplies';

export default function AddMaterialScreen() {
  const {
    listSuppliesAdd,
    listSuppliesModal,
    listSuppliesAdded,
    addSupplies,
    changeMaterial,
    increaseQty,
    decreaseQty,
    handleAddSupplies,
    suppliesType,
    suppliesName,
    showModalChangeSupplies,
    onChangeSupplies,
    onShowModalChangeSupplies,
  } = useSupplies();
  return (
    <BasePage
      // title="Thêm vật tư"
      showBack
      scrollable
      edges={['bottom']}
      centerComponent={
        <>
          <Pressable
            onPress={() => onShowModalChangeSupplies(true)}
            style={[
              styles.submitBtn,
              {
                paddingHorizontal: 8,
                backgroundColor: PRIMARY,
                height: 42,
              },
            ]}
          >
            <AppText style={styles.submitText}>{suppliesName}</AppText>
            <Icon name="arrow-drop-down" size={22} color="white" />
          </Pressable>
        </>
      }
      paddingHorizontal={16}
      containerStyle={{ flex: 1 }}
    >
      <SizeBox height={16} />

      {suppliesType === 1 ? (
        <AddSuppliesComponent
          addSupplies={addSupplies}
          listSuppliesAdd={listSuppliesAdd}
          listSuppliesModal={listSuppliesModal}
          changeMaterial={changeMaterial}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
          listSuppliesAdded={listSuppliesAdded}
          handleAddSupplies={handleAddSupplies}
        />
      ) : (
        <></>
      )}

      <ModalDropdown
        options={[
          {
            id: 1,
            value: 'Thêm vật tư',
          },
          {
            id: 2,
            value: 'Trả vật tư',
          },
        ]}
        visible={showModalChangeSupplies}
        onVisible={() => onShowModalChangeSupplies(false)}
        onChange={onChangeSupplies}
      />
    </BasePage>
  );
}
