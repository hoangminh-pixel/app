import { PRIMARY } from '@/utils/color';
import Icon from '@react-native-vector-icons/material-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';
import { Detail } from '@/services/workRepair';
import moment from 'moment';
import { getSateItem } from '@/utils/stateWork';
import SizeBox from '@/components/SizeBox';

type Props = {
  item: Detail;
  onPressAssignWork: () => void;
};

export const JobCard = (props: Props) => {
  const { item, onPressAssignWork } = props;
  const imageAvailabel =
    item?.list_image_request?.list_image_request?.length > 0 &&
    !item?.list_image_request?.list_image_request[0]?.name_image.includes(
      'mp4',
    );

  return (
    <View style={styles.card}>
      <View>
        {imageAvailabel && (
          <Image
            source={{
              uri: item?.list_image_request?.list_image_request[0]?.image_url,
            }}
            style={styles.image}
            onError={e => console.log('Image error:', e.nativeEvent)}
          />
        )}
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.asset_name.asset_name}</Text>
        <SizeBox height={2} />
        <Text style={styles.code}>{item.name.name}</Text>

        <View style={styles.infoRow}>
          {item?.maintenance_type?.name && (
            <Info
              label="LOẠI"
              value={
                item?.maintenance_type?.name === 'vh' ? 'Vận hành' : 'Bảo trì'
              }
            />
          )}

          <Info
            label="NGÀY THỰC HIỆN"
            value={moment(item?.execution_date?.execution_date).format(
              'DD/MM/YYYY',
            )}
          />
        </View>
        <SizeBox height={10} />
        <View style={styles.infoRow}>
          <Info
            label="TRẠNG THÁI"
            value={getSateItem({ state: item?.state?.state })}
          />
          <Info label="VỊ TRÍ" value={item.mro_location_id.name} />
        </View>
        {/* TODO: ADMIN */}
        {item?.state?.state === 'tp_gv' && (
          <TouchableOpacity
            style={styles.assignBtn}
            onPress={onPressAssignWork}
          >
            <Text style={{ color: '#fff', fontWeight: '700' }}>Giao việc</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const Info = ({ label, value }: any) => (
  <View style={{ flex: 1 }}>
    <Text style={styles.labelSmall}>{label}</Text>
    <Text style={{ fontSize: 12, fontWeight: '600' }}>{value}</Text>
  </View>
);
