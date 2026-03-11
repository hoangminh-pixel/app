import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';
import { PRIMARY } from '@/utils/color';

export type WorkType = 'vh' | 'bt';

type Props = {
  value?: WorkType[];
  onChange?: (value: WorkType[]) => void;
};

const WorkTypeSelector: React.FC<Props> = ({ value = [], onChange }) => {
  const [types, setTypes] = useState<WorkType[]>(value);

  const toggleType = (type: WorkType) => {
    let newTypes: WorkType[];

    if (types.includes(type)) {
      newTypes = types.filter(t => t !== type);
    } else {
      newTypes = [...types, type];
    }

    setTypes(newTypes);
    onChange?.(newTypes);
  };

  const isSelected = (type: WorkType) => types.includes(type);

  return (
    <View style={styles.container}>
      <Pressable style={styles.item} onPress={() => toggleType('vh')}>
        <View style={[styles.circle, isSelected('vh') && styles.circleActive]}>
          {isSelected('vh') && <Icon name="check" size={16} color={PRIMARY} />}
        </View>

        <Text style={[styles.label, isSelected('vh') && styles.labelActive]}>
          Vận hành
        </Text>
      </Pressable>

      <Pressable style={styles.item} onPress={() => toggleType('bt')}>
        <View style={[styles.circle, isSelected('bt') && styles.circleActive]}>
          {isSelected('bt') && <Icon name="check" size={16} color={PRIMARY} />}
        </View>

        <Text style={[styles.label, isSelected('bt') && styles.labelActive]}>
          Bảo trì / Bảo dưỡng
        </Text>
      </Pressable>
    </View>
  );
};

export default WorkTypeSelector;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    paddingTop: 16,
    borderTopWidth: 1,
    borderColor: '#F1F5F9',
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  circleActive: {
    borderColor: PRIMARY,
  },

  label: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },

  labelActive: {
    color: '#334155',
  },
});
