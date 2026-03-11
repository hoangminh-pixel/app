import { AppText } from '@/components';
import { View, Image, ScrollView, Pressable } from 'react-native';
import { styles } from '../styles';
import { StatusCard } from './StatusCard';
import { TaskItem } from './TaskItem';
import { RootHome } from '../hooks/useHome';
import { AVATAR_DEFAULT } from '@/assets/images';
import { getSateItem } from '@/utils/stateWork';

type Props = {
  data?: RootHome;
  summary: {
    label: string;
    value: number | undefined;
    color: string;
    onPress: () => void;
    icon: string;
  }[];
  handleNavigate: (id: number) => void;
};

export const Content = ({ data, summary, handleNavigate }: Props) => {
  return (
    <>
      <View style={styles.section}>
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            {data?.employee_data.avatar ? (
              <Image
                source={{
                  uri: data?.employee_data.avatar_url,
                }}
                style={styles.avatar}
              />
            ) : (
              <Image source={AVATAR_DEFAULT} style={styles.avatar} />
            )}
          </View>

          <View>
            <AppText style={styles.welcome}>
              Xin chào, {data?.employee_data.name}
            </AppText>
            {data?.employee_data?.job_name && (
              <AppText style={styles.role}>
                {data?.employee_data?.job_name}
              </AppText>
            )}
            {data?.employee_data?.department_name && (
              <AppText style={styles.role}>
                {data?.employee_data?.department_name}
              </AppText>
            )}
          </View>
        </View>
      </View>

      {/* Status */}
      <View style={styles.section}>
        <AppText style={styles.sectionTitle}>CÔNG VIỆC TRONG NGÀY</AppText>
        <View style={styles.statusGrid}>
          {summary.map(item => {
            return (
              <StatusCard
                onPress={item.onPress}
                key={item.label}
                icon={item.icon}
                number={item.value}
                label={item.label}
                color={item.color}
              />
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.rowBetween}>
          <AppText style={styles.sectionTitle}>
            DANH SÁCH CÔNG VIỆC TRONG NGÀY
          </AppText>
          {/* <AppText style={styles.viewAll}>Xem tất cả</AppText> */}
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {data?.orders?.map(task => (
            <Pressable key={task.id} onPress={() => handleNavigate(task.id)}>
              <TaskItem
                icon="work"
                title={task.cause_id}
                code={task.name}
                state={task.state}
                status={getSateItem({ state: task.state })}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.rowBetween}>
          <AppText style={styles.sectionTitle}>HOẠT ĐỘNG GẦN ĐÂY</AppText>
          {/* <AppText style={styles.viewAll}>Xem tất cả</AppText> */}
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {data?.activities?.map(task => (
            <TaskItem
              key={task.id}
              icon="work"
              title={task.name}
              code={task.activity_code}
              state={task.state}
              status={getSateItem({ state: task.state })}
            />
          ))}
        </ScrollView>
      </View>
    </>
  );
};
