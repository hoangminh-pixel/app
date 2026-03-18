import { SkeletonBlock } from '@/screens/works/detailMaintenance/components/SkeletonUI';
import { StyleSheet, View } from 'react-native';

const HomeAsmSkeleton = () => {
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <View style={styles.row}>
          <SkeletonBlock style={styles.avatar} />
          <View style={{ marginLeft: 10 }}>
            <SkeletonBlock
              style={{ width: 120, height: 14, borderRadius: 4 }}
            />
            <SkeletonBlock
              style={{ width: 160, height: 10, borderRadius: 4, marginTop: 6 }}
            />
          </View>
        </View>

        <SkeletonBlock style={{ width: 20, height: 20, borderRadius: 4 }} />
      </View>

      {/* CARD */}
      <View style={styles.card}>
        {/* DONUT */}
        <View style={styles.chartWrapper}>
          <View style={styles.donut} />
        </View>

        {/* LEGEND */}
        <View style={styles.legendGrid}>
          {[1, 2, 3, 4].map((_, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={styles.row}>
                <SkeletonBlock style={styles.dot} />
                <SkeletonBlock
                  style={{ width: 80, height: 10, marginLeft: 6 }}
                />
              </View>

              <View style={{ marginLeft: 16, marginTop: 6 }}>
                <SkeletonBlock style={{ width: 40, height: 14 }} />
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default HomeAsmSkeleton;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8fafc',
    flex: 1,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  card: {
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
  },

  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },

  donut: {
    width: 280,
    height: 280,
    borderRadius: 1000,
    borderWidth: 24,
    borderColor: '#e5e7eb', // giống skeleton vòng tròn
  },

  legendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  legendItem: {
    width: '48%',
    marginBottom: 16,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
