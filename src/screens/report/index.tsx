import { AppText, BasePage } from '@/components';
import Dropdown from '@/components/DropDown';
import Icon from '@react-native-vector-icons/material-icons';
import React, { Fragment, useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import { styles } from './styles';
import { Section, SectionInput, SectionTitle } from './components/Section';
import SizeBox from '@/components/SizeBox';

export default function ReportScreen() {
  const [priority, setPriority] = useState('');
  const [team, setTeam] = useState('');
  const [area, setArea] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const image =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAhNeLjnVNDNg-xxiMV83tPvrxWe-NyUYsQ0qihR1Pro0U628sTLJbGtuknfFyjSeTcKAJK9eVFzfIthOry11EXvQd88wnZRp4mo2cojduyx_149hlT7lu2zI1R9wFt0xC604XvTKTza1ieBwWZcYtmsbe8QDtb-6LVD-u8N31w4f6A7y-qoyQuxiJQT8sr7vGYYhSqPn8H2R_LoD1rwguw6OQgz93RKmttUowp1SlEDG5ZpkbLZMtNDyNAlIs8yGY8_gHFH_0shkIJ';
  const addImage = () => {
    if (images.length >= 5) return;
    setImages([...images, image]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <Fragment>
      <BasePage scrollable title="Báo sự cố" showBack>
        <Section title="Thông tin chung" icon="info" />

        <SectionInput label={`Tiêu đề *`} />

        <View style={styles.row}>
          <Dropdown
            label="Mức độ ưu tiên"
            value={priority}
            options={[
              {
                id: 'id1',
                value: 'Thấp1',
              },
              {
                id: 's',
                value: 'Thấp1',
              },
              {
                id: 'a',
                value: 'Thấp1',
              },
            ]}
            onChange={setPriority}
          />
          <Dropdown
            label="Nhóm bảo trì"
            value={team}
            options={[
             {
                id: 'id1',
                value: 'asas',
              },
              {
                id: 's',
                value: 'asd',
              },
              {
                id: 'a',
                value: 'asd',
              },
            ]}
            onChange={setTeam}
          />
        </View>

        <SizeBox height={10} />

        <SectionInput label="Mô tả chi tiết" multiline />

        {/* VỊ TRÍ */}
        <Section title="Vị trí & Địa điểm" icon="location-on" />

        <Dropdown
          label="Khu vực"
          value={area}
          options={[
            {
                id: 'id1',
                value: 'Thấp1',
              },
              {
                id: 's',
                value: 'Thấps1',
              },
              {
                id: 'a',
                value: 'Thấsp1',
              },
          ]}
          onChange={setArea}
        />

        {/* HÌNH ẢNH */}
        <Section title="Hình ảnh hiện trường" icon="image" />

        <View style={styles.imageGrid}>
          {images.map((img, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri: img }} style={styles.image} />
              <Pressable
                style={styles.removeBtn}
                onPress={() => removeImage(index)}
              >
                <Icon name="close" size={14} color="white" />
              </Pressable>
            </View>
          ))}

          {images.length < 5 && (
            <Pressable style={styles.addBox} onPress={addImage}>
              <Icon name="add-a-photo" size={24} />
              <AppText style={{ fontSize: 10 }}>Thêm ảnh</AppText>
            </Pressable>
          )}
        </View>

        <SizeBox height={16} />
        <SectionTitle title="Người yêu cầu" />
        <SizeBox height={10} />

        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <AppText style={{ color: 'white' }}>👤</AppText>
          </View>

          <View>
            <AppText style={styles.userName}>Nguyễn Văn An</AppText>
            <AppText style={styles.userInfo}>
              Mã NV: NV0923 • Phòng Hành chính
            </AppText>
          </View>
        </View>
      </BasePage>
      <View style={styles.footer}>
        <Pressable style={styles.submitBtn}>
          <Icon name="send" size={18} color="white" />
          <AppText style={styles.submitText}>Gửi yêu cầu</AppText>
        </Pressable>
      </View>
    </Fragment>
  );
}
