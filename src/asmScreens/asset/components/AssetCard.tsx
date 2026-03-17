import { View, Text } from 'react-native';
import { styles } from '../styles';
import { RootAssetData } from '../hooks/useAsset';

export const AssetCard = ({ item }: { item: RootAssetData }) => {
  const statusMap: any = {
    good: {
      label: 'Tốt',
      color: '#16a34a',
      bg: '#dcfce7',
    },
    broken: {
      label: 'Hỏng',
      color: '#dc2626',
      bg: '#fee2e2',
    },
    repair: {
      label: 'Sửa chữa',
      color: '#d97706',
      bg: '#fef3c7',
    },
    stock: {
      label: 'Lưu kho',
      color: '#64748b',
      bg: '#e2e8f0',
    },
  };

  const status = statusMap[item.state] || statusMap.good;
  return (
    <View style={styles.card}>
      {/* header */}
      <View style={styles.cardHeader}>
        <Text style={styles.code}>{item.code}</Text>

        <View style={[styles.status, { backgroundColor: status.bg }]}>
          <View style={[styles.dot, { backgroundColor: status.color }]} />
          <Text style={[styles.statusText, { color: status.color }]}>
            {status.label}
          </Text>
        </View>
      </View>

      {/* name */}
      <Text style={styles.assetName}>{item.name}</Text>

      {/* info */}
      <View style={styles.infoGrid}>
        <View>
          <Text style={styles.infoLabel}>SỐ LƯỢNG</Text>
          <Text style={styles.infoValue}>{item.quantity}</Text>
        </View>

        <View>
          <Text style={styles.infoValue}>{item.type.name}</Text>
        </View>
      </View>
    </View>
  );
};
