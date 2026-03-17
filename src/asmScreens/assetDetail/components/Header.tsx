import { Image, Text, View } from 'react-native';
import { styles } from '../styles';
import SizeBox from '@/components/SizeBox';

type Props = {
  assetName: string;
  assetCode: string;
  category: string;
  location: string;
  quantity: string;
  amount: string;
  priceUnit: string;
  assetType: string;
  assetImage: string;
};

export const HeaderAsset = ({
  assetName,
  assetCode,
  category,
  location,
  quantity,
  amount,
  priceUnit,
  assetType,
  assetImage,
}: Props) => {
  return (
    <View>
      <View style={styles.card}>
        <Image
          source={{
            uri: assetImage,
          }}
          style={styles.image}
        />

        <View style={{ padding: 16 }}>
          <View style={styles.badgeRow}>
            <Text style={styles.badge}>{assetCode}</Text>
            <Text style={styles.subBadge}>{category}</Text>
          </View>

          <Text style={styles.assetTitle}>{assetName}</Text>
        </View>
      </View>

      <SizeBox height={22} />

      {/* THÔNG TIN CHUNG */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Thông tin chung</Text>

        <InfoRow label="Nhóm" value={assetType} />
        <InfoRow label="Số lượng" value={`${quantity} Cái`} />
        <InfoRow label="Đơn giá" value={priceUnit} />
        <InfoRow label="Tổng giá trị" value={amount} highlight />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Chi tiết sử dụng</Text>
        {/* <Text style={styles.viewAll}>Xem tất cả</Text> */}
      </View>
    </View>
  );
};

const InfoRow = ({ label, value, highlight }: any) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={[styles.infoValue, highlight && styles.highlight]}>
      {value}
    </Text>
  </View>
);
