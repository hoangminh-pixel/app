import { Data } from '@/services/workRepair';
import Icon from '@react-native-vector-icons/material-icons';
import React, { Fragment, useState } from 'react';
import {
  Image,
  Pressable,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../styles';
import SizeBox from '@/components/SizeBox';
import { AppInput } from '@/components';
import { PRIMARY } from '@/utils/color';
import { useItemChecklist } from '../hooks/useItemChecklist';
import { MediaTypeRes } from '@/hooks/useAppCamera';
import Video from 'react-native-video';

type Props = {
  type: string;
  index: number;
  item: ChecklistItem;
  isDoneButton: boolean;
};

type ChecklistComponentProps = {
  data: ChecklistItem[] | null;
  isDoneButton: boolean;
};

export const ChecklistComponent = ({
  data,
  isDoneButton,
}: ChecklistComponentProps) => {
  return (
    <View>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}
      >
        <Icon name="fact-check" size={20} color={PRIMARY} />
        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            marginLeft: 8,
          }}
        >
          CHI TIẾT CÔNG VIỆC (CHECKLIST)
        </Text>
      </View>
      {data?.map((item, index) => {
        return (
          <View key={item?.id}>
            <ChecklistItem
              type={item.test_type.test_type}
              index={index + 1}
              item={item}
              isDoneButton={isDoneButton}
            />
            <SizeBox height={8} />
          </View>
        );
      })}
    </View>
  );
};

function ChecklistItem({ type, index, item, isDoneButton }: Props) {
  const [isShow, setIsShow] = useState(false);
  const {
    pass,
    fail,
    handleChangePassFail,
    handleUpdateChecklist,
    itemSuccess,
    checklistDesc,
    onChecklistDescChange,
    measure,
    onMeasureChange,
    handleOpenCamera,
    handleOpenPhoto,
    mediaResponse,
    removeMedia,
    displayMedia,
    openLibrary,
    handleNavigateDetailMedia,
  } = useItemChecklist({ item, checklistType: type });

  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        elevation: 2,
      }}
    >
      {/* Header */}
      <Pressable onPress={() => setIsShow(!isShow)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginRight: 16,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {itemSuccess !== null &&
              (itemSuccess ? (
                <View style={{ flexDirection: 'row' }}>
                  <Icon name="check-circle" size={20} color="#22c55e" />
                  <SizeBox width={5} />
                </View>
              ) : (
                <View style={{ flexDirection: 'row' }}>
                  <Icon name="cancel" size={20} color="#ef4444" />
                  <SizeBox width={5} />
                </View>
              ))}

            <Text style={{ fontSize: 14, fontWeight: '600', flex: 1 }}>
              {index}. {item.name.name}
            </Text>
          </View>
          <Icon name="star" size={20} color="#facc15" />
        </View>
      </Pressable>

      <View style={{ display: isShow ? 'flex' : 'none' }}>
        <SizeBox height={8} />
        {/* Guide */}
        {/* <TouchableOpacity>
          <Text
            style={{
              fontSize: 12,
              color: '#2563eb',
              fontWeight: '500',
              textDecorationLine: 'underline',
              marginBottom: 8,
            }}
          >
            Hướng dẫn
          </Text>
        </TouchableOpacity> */}

        {/* Description */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 12, color: '#64748b' }}>
            <Text style={{ fontWeight: '700', color: '#0f172a' }}>Mô tả:</Text>{' '}
            {item?.description?.description}
          </Text>

          <Text style={{ fontSize: 12, color: '#64748b' }}>
            <Text style={{ fontWeight: '700', color: '#0f172a' }}>
              Ghi chú:
            </Text>{' '}
            {item?.task_effect?.task_effect}
          </Text>
        </View>

        {/* TYPE RENDER */}
        {type === 'passfail' && (
          <ToggleSection
            pass={pass}
            fail={fail}
            handleChangePassFail={handleChangePassFail}
          />
        )}
        {type === 'text' && (
          <EditSection value={checklistDesc} onChange={onChecklistDescChange} />
        )}
        {type === 'picture' && (
          <MediaSection
            openCamera={handleOpenCamera}
            openPhoto={handleOpenPhoto}
            media={displayMedia}
            removeMedia={removeMedia}
            openLibrary={openLibrary}
            handleNavigateDetailMedia={handleNavigateDetailMedia}
          />
        )}
        {type === 'measure' && (
          <MeasureSection
            value={measure}
            onChange={onMeasureChange}
            from={item?.tolerance_min?.tolerance_min}
            to={item?.tolerance_max?.tolerance_max}
          />
        )}
        {isDoneButton && (
          <Fragment>
            <SizeBox height={16} />

            <TouchableOpacity
              onPress={handleUpdateChecklist}
              style={{ alignSelf: 'flex-end' }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: PRIMARY,
                  padding: 8,
                  borderRadius: 8,
                }}
              >
                <Icon name="check" size={20} color={'white'} />
                <SizeBox width={2} />
                <Text style={{ color: 'white', fontWeight: '600' }}>
                  Hoàn thành
                </Text>
              </View>
            </TouchableOpacity>
          </Fragment>
        )}
      </View>
    </View>
  );
}

function ToggleSection({
  pass,
  fail,
  handleChangePassFail,
}: {
  pass: boolean;
  fail: boolean;
  handleChangePassFail: ({
    val,
    isPass,
  }: {
    val: boolean;
    isPass: boolean;
  }) => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 24,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
      }}
    >
      {/* PASS */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text
          style={{
            fontSize: 10,
            fontWeight: '700',
            color: '#64748b',
          }}
        >
          PASS
        </Text>

        <Switch
          value={pass}
          onValueChange={v => {
            handleChangePassFail({ val: v, isPass: true });
          }}
          trackColor={{ false: '#e2e8f0', true: '#22c55e' }}
          thumbColor="#ffffff"
        />
      </View>

      {/* FAIL */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text
          style={{
            fontSize: 10,
            fontWeight: '700',
            color: '#64748b',
          }}
        >
          FAIL
        </Text>

        <Switch
          value={fail}
          onValueChange={v => {
            handleChangePassFail({ val: v, isPass: false });
          }}
          trackColor={{ false: '#e2e8f0', true: '#ef4444' }}
          thumbColor="#ffffff"
        />
      </View>
    </View>
  );
}

function EditSection({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <View>
      <View>
        <View style={{ flex: 1 }}>
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="Nhập...."
            placeholderTextColor={'#888'}
            style={[
              {
                backgroundColor: '#fff',
                padding: 14,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: '#ddd',
                marginBottom: 12,
                height: 90,
                textAlignVertical: 'top',
              },
            ]}
            multiline
          />
        </View>
      </View>
    </View>
  );
}

function MediaSection({
  openCamera,
  openPhoto,
  media,
  removeMedia,
  openLibrary,
  handleNavigateDetailMedia,
}: {
  openCamera: () => void;
  openPhoto: () => void;
  media: MediaTypeRes[];
  openLibrary: () => void;
  removeMedia: (index: number) => void;
  handleNavigateDetailMedia: ({
    url,
    type,
  }: {
    url: string;
    type: string;
  }) => void;
}) {
  return (
    <View>
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <TouchableOpacity onPress={openCamera}>
          <Icon name="videocam" size={22} color="#94a3b8" />
        </TouchableOpacity>
        <TouchableOpacity onPress={openPhoto}>
          <Icon name="photo-camera" size={22} color="#94a3b8" />
        </TouchableOpacity>

        <TouchableOpacity onPress={openLibrary}>
          <Icon name="image" size={22} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      <SizeBox height={16} />

      <View style={styles.imageGrid}>
        {media.map((item, index) =>
          item.type === 'photo' ? (
            <View key={index} style={styles.imageWrapper}>
              <Pressable
                onPress={() => {
                  handleNavigateDetailMedia({ url: item.url, type: 'photo' });
                }}
              >
                <Image
                  source={{
                    uri: item.url,
                  }}
                  style={styles.imageChecklist}
                />
              </Pressable>

              <Pressable
                style={styles.removeBtn}
                onPress={() => removeMedia(index)}
              >
                <Icon name="close" size={14} color="white" />
              </Pressable>
            </View>
          ) : (
            <View key={index} style={styles.imageWrapper}>
              <Pressable
                onPress={() => {
                  handleNavigateDetailMedia({ url: item.url, type: 'video' });
                }}
              >
                <Video
                  style={[styles.imageChecklist, { overflow: 'hidden' }]}
                  source={{ uri: item.url }}
                  muted
                  repeat
                  resizeMode="cover"
                />
              </Pressable>

              <Pressable
                style={styles.removeBtn}
                onPress={() => removeMedia(index)}
              >
                <Icon name="close" size={14} color="white" />
              </Pressable>
            </View>
          ),
        )}
      </View>
    </View>
  );
}

function MeasureSection({
  value,
  onChange,
  from,
  to,
}: {
  value: string;
  onChange: (v: string) => void;
  from: string;
  to: string;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Text style={{ fontSize: 12, fontWeight: '500' }}>Đo lường:</Text>

      <View>
        <TextInput
          value={value}
          inputMode="numeric"
          placeholder="...."
          onChangeText={onChange}
          placeholderTextColor={'#888'}
          style={[
            {
              backgroundColor: '#fff',
              paddingHorizontal: 14,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: '#ddd',
              marginBottom: 12,
              height: 40,
              width: 56,
              alignSelf: 'center',
            },
          ]}
        />
      </View>

      <Text style={{ fontSize: 12, color: '#64748b' }}>mm</Text>

      <Text style={{ fontSize: 12, color: '#64748b' }}>
        Từ: <Text style={{ fontWeight: '700', color: '#000' }}>{from}</Text>{' '}
        đến: <Text style={{ fontWeight: '700', color: '#000' }}>{to}</Text>
      </Text>
    </View>
  );
}

export interface ChecklistItem {
  id: number;
  name: Name;
  measure: Measure;
  measure_success: MeasureSuccess;
  tolerance_min: ToleranceMin;
  tolerance_max: ToleranceMax;
  norm_unit: NormUnit;
  test_type: TestType;
  note: Note;
  description: Description;
  task_effect: TaskEffect;
  duration: Duration;
  guide: Guide;
  is_mandatory: IsMandatory;
  task_depend_ids: TaskDependIds;
  mro_check: MroCheck;
  asset_category_level1_id: number;
  asset_category_level2_id: string;
  zone_id: number;
  mro_location_id: number;
  state_action: StateAction;
  list_image_url: ListImageUrl;
}

interface Name {
  name: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

interface Measure {
  measure: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

interface MeasureSuccess {
  measure_success: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

interface ToleranceMin {
  tolerance_min: any;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

interface ToleranceMax {
  tolerance_max: any;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

interface NormUnit {
  norm_unit: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

interface TestType {
  test_type: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

interface Note {
  note: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

interface Description {
  description: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

interface TaskEffect {
  task_effect: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

interface Duration {
  duration: number;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

interface Guide {
  guide: boolean;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

interface IsMandatory {
  is_mandatory: boolean;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

interface TaskDependIds {
  task_depend_ids: any;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

interface MroCheck {
  mro_check: MroCheck2;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

interface MroCheck2 {
  key: string;
  value: string;
}

interface StateAction {
  state_action: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

interface ListImageUrl {
  list_image_url: any[];
  field_name: string;
  required: boolean;
  readonly: boolean;
}
