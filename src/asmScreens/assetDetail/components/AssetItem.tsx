import { Text, View } from 'react-native';
import { styles } from '../styles';

type Props = {
  qty: number;
  location: string;
  state: string;
  employee: string;
  zone: string;
};

export const AssetItem = ({ qty, location, state, employee, zone }: Props) => {
  return (
    <View style={styles.usageCard}>
      <View style={styles.rowBetween}>
        <View>
          <Text style={styles.qty}>Số lượng: {qty}</Text>
          <Text style={styles.location}>{location}</Text>
        </View>

        <Text style={styles.status}>{state}</Text>
      </View>

      <View style={styles.usageInfo}>
        {employee && <Text style={styles.usageText}>👤 {employee}</Text>}
        {zone && <Text style={styles.usageText}>📍 {zone}</Text>}
      </View>
    </View>
  );
};
