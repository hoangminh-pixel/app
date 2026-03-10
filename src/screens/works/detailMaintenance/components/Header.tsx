import SizeBox from '@/components/SizeBox';
import { Data } from '@/services/workRepair';
import Icon from '@react-native-vector-icons/material-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';
import { getSateColor, getSateItem } from '@/utils/stateWork';
import { PRIMARY } from '@/utils/color';
import { useAppSelector } from '@/redux/store/hooks';
import { ADMIN, TECH } from '@/utils/appConstant';

type Props = {
  detail: Data | undefined;
  onOpenAssignModal: () => void;
  onGetJob: () => void;

};

export const HeaderComponent = ({ detail, onOpenAssignModal, onGetJob }: Props) => {
  const role = useAppSelector(state => state.auth.user?.role ?? '');
  const user = useAppSelector(state => state.auth.user);

  const isShowGetJobButton = () => {
    const userName = user?.name;

    const boolOne = detail?.execute_employee_id?.name === userName;
    const boolTwo = detail?.assign_employee_ids?.assign_employee_ids?.some(
      item => item?.name === userName,
    );
    return boolOne || boolTwo || role === ADMIN;
  };

  const transitions = detail?.list_transitions?.list_transitions ?? [];

  const hasConfirmOrReturn = transitions.some(
    e =>
      e.action === 'button_confirm_order_action' || e.action === 'return_work',
  );

  const hasReturn = transitions.some(e => e.action === 'return_work');

  const isAdmin = role === ADMIN;
  const isTech = role === TECH;

  const shouldShowAdminButton = isAdmin && hasConfirmOrReturn;

  const shouldShowTechButton = isTech && hasReturn && isShowGetJobButton();

  const shouldShowButton = shouldShowAdminButton || shouldShowTechButton;

  const hasConfirmAction = transitions.some(
    e => e.action === 'button_confirm_order_action',
  );

  const shouldShowButtonTech = role === TECH && hasConfirmAction;

  const buttonText = isAdmin
    ? detail?.state?.state === 'tp_gv'
      ? 'Giao việc'
      : 'Giao lại việc'
    : 'Giao lại việc';

  const shouldShowGetJobButton =
    detail?.state?.state === 'give' && isShowGetJobButton();

  return (
    <View>
      <View style={styles.section}>
        <View style={styles.rowBetween}>
          <View style={{ flex: 1 }}>
            <View style={styles.statusBadge}>
              <Text
                style={[
                  styles.statusText,
                  {
                    color: `${getSateColor({
                      state: detail?.state?.state ?? '',
                    })}`,
                  },
                ]}
              >
                {getSateItem({ state: detail?.state?.state ?? '' })}
              </Text>
            </View>
            <Text style={styles.title}>
              {detail?.name_related?.name_related}
            </Text>
            <Text style={styles.code}>{detail?.name?.name}</Text>
          </View>

          {shouldShowButtonTech && (
            <TouchableOpacity
              style={[styles.primaryButton]}
              onPress={onOpenAssignModal}
            >
              <Icon name="assignment-turned-in" size={16} color="#fff" />
              <Text style={styles.primaryButtonText}>Giao việc</Text>
            </TouchableOpacity>
          )}

          {shouldShowButton && (
            <TouchableOpacity
              style={[styles.primaryButton]}
              onPress={onOpenAssignModal}
            >
              <Icon name="assignment-turned-in" size={16} color="#fff" />
              <Text style={styles.primaryButtonText}>{buttonText}</Text>
            </TouchableOpacity>
          )}

          {shouldShowGetJobButton && (
            <TouchableOpacity
              style={[styles.primaryButton]}
              onPress={onGetJob}
            >
              <Icon name="assignment-turned-in" size={16} color="#fff" />
              <Text style={styles.primaryButtonText}>Nhận việc</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={{ alignItems: 'flex-start' }}>
        <Tag icon="location-on" label={detail?.mro_location_id.name} />
        <SizeBox height={8} />
        <Tag icon="calendar-today" label="25/12/2024" />
      </View>

      <SizeBox height={12} />

      <View>
        {detail?.parameter_description?.parameter_description && (
          <View style={styles.section}>
            <SectionTitle
              icon="settings-input-component"
              title="Thông số kỹ thuật"
            />
            <Text style={{ fontWeight: 'normal', fontSize: 14 }}>
              {detail?.parameter_description?.parameter_description}
            </Text>
          </View>
        )}

        {detail?.reject_reason?.reject_reason && (
          <View style={styles.section}>
            <SectionTitle icon="cancel" title="Lý do từ chối" />
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Text style={{ fontSize: 18, marginRight: 6, lineHeight: 20 }}>
                {'\u2022'}
              </Text>

              <Text style={{ flex: 1, fontSize: 14, lineHeight: 20 }}>
                {detail?.reject_reason?.reject_reason}
              </Text>
            </View>
          </View>
        )}

        {detail?.reasons_not_completing?.reasons_not_completing && (
          <View style={styles.section}>
            <SectionTitle icon="info" title="Lý do không hoàn thành đúng hạn" />
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Text style={{ fontSize: 18, marginRight: 6, lineHeight: 20 }}>
                {'\u2022'}
              </Text>

              <Text style={{ flex: 1, fontSize: 14, lineHeight: 20 }}>
                {detail?.reasons_not_completing?.reasons_not_completing}
              </Text>
            </View>
          </View>
        )}
      </View>

      <SectionTitle icon="groups" title="Nhân sự" />

      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <PersonnelCard
            name={detail?.execute_employee_id?.name}
            role="Nhân viên thực hiện"
            icon="person"
          />
        </View>

        <SizeBox width={8} />
        <View style={{ flex: 1 }}>
          <PersonnelCard
            name={detail?.check_employee_id?.name}
            role="Nhân viên kiểm tra"
            icon="person"
          />
        </View>
      </View>

      <PersonnelCard
        name={detail?.assign_employee_ids?.assign_employee_ids}
        role="Nhân viên đồng thực hiện"
        icon="person"
      />
    </View>
  );
};

const Tag = ({ icon, label }: any) => (
  <View style={[styles.tag]}>
    <Icon name={icon} size={16} color={PRIMARY} />
    <Text style={{ fontSize: 13, flexShrink: 1 }}>{label}</Text>
  </View>
);

const SectionTitle = ({ icon, title }: any) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginBottom: 12,
    }}
  >
    <Icon name={icon} size={20} color={PRIMARY} />
    <Text style={{ fontWeight: '700', fontSize: 16 }}>{title}</Text>
  </View>
);

const PersonnelCard = ({ name, role, icon, primary }: any) => {
  const isArray = Array.isArray(name);
  const isEmptyArray = isArray && name.length === 0;

  return (
    <View style={styles.personCard}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View
          style={[styles.avatar, primary && { backgroundColor: '#dbeafe' }]}
        >
          <Icon name={icon} size={20} color={PRIMARY} />
        </View>

        <View style={{ flex: 1 }}>
          {/* STRING CASE */}
          {!isArray && (
            <>
              <Text style={{ fontWeight: '600' }}>
                {name || 'Chưa có nhân sự'}
              </Text>
              {!!role && (
                <Text style={{ fontSize: 12, color: '#666' }}>{role}</Text>
              )}
            </>
          )}

          {/* ARRAY CASE */}
          {isArray && (
            <>
              {isEmptyArray ? (
                <Text style={{ fontWeight: '600' }}>Chưa có nhân sự</Text>
              ) : (
                name.map((item: any, index: number) => (
                  <View key={item?.id ?? item?.name ?? index}>
                    <Text style={{ fontWeight: '600' }} numberOfLines={1}>
                      {item?.name}
                    </Text>
                  </View>
                ))
              )}

              {!!role && (
                <Text style={{ fontSize: 12, color: '#666' }}>{role}</Text>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
};
