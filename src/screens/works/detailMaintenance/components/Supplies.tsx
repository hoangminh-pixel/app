import { Data } from '@/services/workRepair';
import Icon from '@react-native-vector-icons/material-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';
type Props = {
  detail: Data | undefined;
};

export const SuppliesComponent = ({ detail }: Props) => {
  const [isShowFlatList, setIsShowFlatList] = useState(false);

  return (
    <View>
      {detail?.additional_parts?.list_additional_parts &&
        detail?.additional_parts?.list_additional_parts.length > 0 && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  color: '#64748b', // slate-500
                }}
              >
                VẬT TƯ ĐÃ THÊM
              </Text>

              <TouchableOpacity
                onPress={() => setIsShowFlatList(!isShowFlatList)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    color: '#475569', // slate-600
                  }}
                >
                  ẨN
                </Text>

                <Icon
                  name="expand-circle-down"
                  size={20}
                  color="#15803d" // green-700
                />
              </TouchableOpacity>
            </View>
            {isShowFlatList && (
              <View>
                {detail?.additional_parts?.list_additional_parts.map(
                  (item, index) => (
                    <AddedMaterialSection key={index} item={item} />
                  ),
                )}
              </View>
            )}
          </View>
        )}

      {detail?.returned_parts?.list_returned_parts &&
        detail?.returned_parts?.list_returned_parts.length > 0 && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  color: '#64748b', // slate-500
                }}
              >
                VẬT TƯ ĐÃ TRẢ
              </Text>

              <TouchableOpacity
                onPress={() => setIsShowFlatList(!isShowFlatList)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    color: '#475569', // slate-600
                  }}
                >
                  ẨN
                </Text>

                <Icon
                  name="expand-circle-down"
                  size={20}
                  color="#15803d" // green-700
                />
              </TouchableOpacity>
            </View>
            {isShowFlatList && (
              <View>
                {detail?.returned_parts?.list_returned_parts.map(
                  (item, index) => (
                    <AddedMaterialSection key={index} item={item} />
                  ),
                )}
              </View>
            )}
          </View>
        )}
    </View>
  );
};

function AddedMaterialSection({ item }: any) {
  return (
    <View style={{ marginBottom: 24 }}>
      <View style={styles.cardSupplies}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 16,
            }}
          >
            {/* Image box */}
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 12,
                backgroundColor: '#f1f5f9',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#e2e8f0',
              }}
            >
              <Icon name="image-not-supported" size={32} color="#94a3b8" />
            </View>
            {/* <View style={{ flex: 1 }}>
              <AppInput />
            </View> */}

            {/* Text */}
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: '#1e293b',
                }}
              >
                {item?.parts_id?.name}
              </Text>

              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: '#1e293b',
                }}
              >
                {item.parts_uom.parts_uom}
              </Text>
            </View>
          </View>

          {/* Quantity */}
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              color: '#15803d',
            }}
          >
            {item.parts_qty.quant_qty}
          </Text>
        </View>
      </View>
    </View>
  );
}
