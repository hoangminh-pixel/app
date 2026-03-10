import { AppText } from '@/components';
import SizeBox from '@/components/SizeBox';
import { PRIMARY } from '@/utils/color';
import React from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { styles } from '../styles';
import Icon from '@react-native-vector-icons/material-icons';
import { RootSupplies, RootSuppliesAdded } from '../hooks/useSupplies';
import { MaterialItem, MaterialItemAdded } from './MatetialItem';

type Props = {
  addSupplies: () => void;
  listSuppliesAdd: RootSupplies[];
  listSuppliesModal: {
    id: number;
    value: string;
  }[];
  changeMaterial: (materialId: number, index: number) => void;
  increaseQty: (index: number) => void;
  decreaseQty: (index: number) => void;
  listSuppliesAdded: RootSuppliesAdded[];
  handleAddSupplies: () => Promise<void>;
};

const AddSuppliesComponent = ({
  addSupplies,
  listSuppliesAdd,
  changeMaterial,
  increaseQty,
  decreaseQty,
  listSuppliesModal,
  listSuppliesAdded,
  handleAddSupplies,
}: Props) => {
  return (
    <View style={{flex:1}}>
      <View>
        <Pressable
          onPress={addSupplies}
          style={[
            styles.submitBtn,
            {
              alignSelf: 'flex-start',
              paddingHorizontal: 8,
              backgroundColor: PRIMARY,
              height: 42,
            },
          ]}
        >
          <AppText style={styles.submitText}>Thêm vật tư</AppText>
          <Icon name="add" size={22} color="white" />
        </Pressable>
      </View>

      <SizeBox height={16} />

      <View>
        <View style={styles.header}>
          <AppText style={styles.title}>Vật tư đã thêm</AppText>
          <View style={styles.badge}>
            <AppText style={styles.badgeText}>
              {listSuppliesAdd.length} mặt hàng
            </AppText>
          </View>
        </View>

        <FlatList
          scrollEnabled={false}
          data={listSuppliesAdd}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item, index }) => (
            <MaterialItem
              item={item}
              index={index}
              listSuppliesModal={listSuppliesModal}
              changeMaterial={changeMaterial}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
            />
          )}
        />
      </View>

      <View>
        <View style={styles.header}>
          <AppText style={styles.title}>Vật tư đã thêm trước đó</AppText>
          <View style={styles.badge}>
            <AppText style={styles.badgeText}>
              {listSuppliesAdded.length} mặt hàng
            </AppText>
          </View>
        </View>

        <FlatList
          scrollEnabled={false}
          data={listSuppliesAdded}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <MaterialItemAdded item={item} />}
        />
      </View>
      <SizeBox height={120} />

      <View style={styles.footer}>
        <Pressable style={styles.submitBtn} onPress={handleAddSupplies}>
          <AppText style={styles.submitText}>Hoàn thành</AppText>
          <Icon name="check-circle" size={22} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

export default AddSuppliesComponent;
