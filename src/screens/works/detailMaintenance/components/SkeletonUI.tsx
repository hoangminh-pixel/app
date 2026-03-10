import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  ScrollView,
} from "react-native";

export const SkeletonBlock = ({ style }: { style?: any }) => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        {
          backgroundColor: "#ced8e4",
          opacity,
        },
        style,
      ]}
    />
  );
};

const JobDetailSkeleton = () => {
  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <SkeletonBlock style={{ width: 180, height: 20, borderRadius: 6 }} />
      </View>

      {/* Status */}
      <View style={styles.section}>
        <SkeletonBlock style={{ width: 120, height: 20, marginBottom: 16 }} />
        <View style={styles.rowBetween}>
          <View style={styles.row}>
            <SkeletonBlock style={{ width: 20, height: 20, borderRadius: 4 }} />
            <SkeletonBlock
              style={{ width: 90, height: 16, marginLeft: 12 }}
            />
          </View>
          <SkeletonBlock
            style={{ width: 84, height: 32, borderRadius: 8 }}
          />
        </View>
      </View>

      {/* Title */}
      <View style={styles.section}>
        <SkeletonBlock
          style={{ width: "75%", height: 28, borderRadius: 8, marginBottom: 8 }}
        />
        <SkeletonBlock
          style={{ width: "35%", height: 16, borderRadius: 4 }}
        />
      </View>

      {/* Chips */}
      <View style={styles.chips}>
        <SkeletonBlock style={styles.chip} />
        <SkeletonBlock style={styles.chipWide} />
      </View>

      <View style={styles.section}>
        <SkeletonBlock
          style={{ width: "75%", height: 28, borderRadius: 8, marginBottom: 8 }}
        />
        <SkeletonBlock
          style={{ width: "35%", height: 16, borderRadius: 4 }}
        />
      </View>

      {/* Chips */}
      <View style={styles.chips}>
        <SkeletonBlock style={styles.chip} />
        <SkeletonBlock style={styles.chipWide} />
      </View>

      <View style={styles.section}>
        <SkeletonBlock
          style={{ width: "75%", height: 28, borderRadius: 8, marginBottom: 8 }}
        />
        <SkeletonBlock
          style={{ width: "35%", height: 16, borderRadius: 4 }}
        />
      </View>

      {/* Chips */}
      <View style={styles.chips}>
        <SkeletonBlock style={styles.chip} />
        <SkeletonBlock style={styles.chipWide} />
      </View>

      <View style={styles.section}>
        <SkeletonBlock
          style={{ width: "75%", height: 28, borderRadius: 8, marginBottom: 8 }}
        />
        <SkeletonBlock
          style={{ width: "35%", height: 16, borderRadius: 4 }}
        />
      </View>

      {/* Chips */}
      <View style={styles.chips}>
        <SkeletonBlock style={styles.chip} />
        <SkeletonBlock style={styles.chipWide} />
      </View>
      

      {/* Technical Specs */}
      {/* <View style={styles.section}>
        <SkeletonBlock
          style={{ width: 180, height: 20, marginBottom: 16 }}
        />
        <View style={styles.grid}>
          {[1, 2, 3, 4].map((_, i) => (
            <View key={i} style={styles.card}>
              <SkeletonBlock
                style={{ width: "50%", height: 12, marginBottom: 8 }}
              />
              <SkeletonBlock style={{ width: "75%", height: 18 }} />
            </View>
          ))}
        </View>
      </View> */}

      {/* Personnel */}
      <View style={styles.section}>
        <SkeletonBlock
          style={{ width: 200, height: 20, marginBottom: 16 }}
        />
        {[1, 2, 3].map((_, i) => (
          <View key={i} style={styles.personRow}>
            <View style={{ flex: 1 }}>
              <SkeletonBlock
                style={{ width: "50%", height: 16, marginBottom: 8 }}
              />
              <SkeletonBlock style={{ width: "35%", height: 12 }} />
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: 80 }} />
    </View>
  );
};

export default JobDetailSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chips: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    width: 110,
    height: 32,
    borderRadius: 20,
  },
  chipWide: {
    width: 130,
    height: 32,
    borderRadius: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  personRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
});