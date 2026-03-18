import { PRIMARY } from '@/utils/color';
import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';

interface Item {
  category_id: {
    name: string;
  };
  quantity: number;
}

interface Props {
  data: Item[];
}

export default function BarChartReport({ data }: Props) {
  const max = Math.max(...data.map(i => i.quantity), 1);

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.chartRow}>
          {data.map((item, index) => {
            const height = (item.quantity / max) * 300;

            return (
              <View key={index} style={styles.barItem}>
                <Text style={styles.value}>{item.quantity}</Text>

                <Pressable
                  style={[
                    styles.bar,
                    {
                      height,
                      backgroundColor: PRIMARY,
                      //     opacity: 1 - index * 0.1,
                    },
                  ]}
                />

                <Text numberOfLines={3} style={styles.label}>
                  {item.category_id.name}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },

  chartRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    //     justifyContent: 'space-between',
    //     height: 180,
  },

  barItem: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
    width: 60,
  },

  bar: {
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  value: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 4,
    color: PRIMARY,
  },

  label: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 6,
    color: '#64748b',
    height: 44,
  },

  legend: {
    marginTop: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },

  legendText: {
    fontSize: 12,
    color: '#555',
  },
});
