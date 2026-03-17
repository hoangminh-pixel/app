import { PRIMARY } from '@/utils/color';
import Icon from '@react-native-vector-icons/material-icons';
import React, { Fragment } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';
import { Detail } from '@/services/workRepair';
import moment from 'moment';
import { getSateColor, getSateItem } from '@/utils/stateWork';
import SizeBox from '@/components/SizeBox';

type Props = {
  item: Detail;
  onPressAssignWork: (id: any) => void;
  isAdmin: boolean;
};

export const JobCard = (props: Props) => {
  const { item, onPressAssignWork, isAdmin } = props;
  const imageAvailabel =
    item?.list_image_request?.list_image_request?.length > 0 &&
    !item?.list_image_request?.list_image_request[0]?.name_image.includes(
      'mp4',
    );

  const assignList = item?.assign_employee_ids?.assign_employee_ids ?? [];
  const execute = item?.execute_employee_id;

  let staff = [...assignList];

  if (execute?.id) {
    const isExist = assignList.some(emp => emp.id === execute.id);

    if (!isExist) {
      staff.push({
        id: execute.id,
        name: execute.name,
      });
    }
  }

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
        <Text style={styles.code}>{item.name.name}</Text>
        <SizeBox height={2} />
        <Text style={styles.title}>{item.asset_name.asset_name}</Text>

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
            label="NGÀY GIAO VIỆC"
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
            color={getSateColor({
              state: item?.state?.state ?? '',
            })}
          />
          <Info label="VỊ TRÍ" value={item.mro_location_id.name} />
        </View>

        {staff && staff.length > 0 && (
          <Fragment>
            <SizeBox height={10} />
            <InfoStaff label="NHÂN VIÊN" value={staff} />
            <SizeBox height={10} />
          </Fragment>
        )}

        {/* TODO: ADMIN */}
        {item?.state?.state === 'tp_gv' && isAdmin && (
          <TouchableOpacity
            style={styles.assignBtn}
            onPress={() => {
              onPressAssignWork(item.id);
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '700' }}>Giao việc</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const Info = ({ label, value, color }: any) => (
  <View style={{ flex: 1 }}>
    <Text style={styles.labelSmall}>{label}</Text>
    <Text style={{ fontSize: 12, fontWeight: '600', color }}>{value}</Text>
  </View>
);

const InfoStaff = ({ label, value, color }: any) => (
  <View style={{ flex: 1 }}>
    <Text style={styles.labelSmall}>{label}</Text>
    {value?.map((item: any) => {
      return (
        <Text key={item.id} style={{ fontSize: 12, fontWeight: '600', color }}>
          {item.name}
        </Text>
      );
    })}
  </View>
);
