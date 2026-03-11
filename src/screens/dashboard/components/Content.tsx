import React, { Fragment } from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles';
import { RootDashboard } from '../hooks/useDashboard';
import { AVATAR_DEFAULT } from '@/assets/images';
import DonutChart from '@/components/DonutChart';

type Props = {
  startDate: string;
  endDate: string;
  data?: RootDashboard;
};
const sizeChart = 120;
export const ContentDashboard = ({ startDate, endDate, data }: Props) => {
  const getPriorityColor = (code: string) => {
    switch (code) {
      case 'KHANCAP':
        return '#c0392b';
      case 'NGHIEMTRONG':
        return '#e74c3c';
      case 'CAO':
        return '#f39c12';
      case 'TRUNGBINH':
        return '#f1c40f';
      case 'THAP':
        return '#2ecc71';
      default:
        return '#95a5a6';
    }
  };
  return (
    <Fragment>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Thống kê công việc từ {startDate} đến {endDate}
        </Text>

        <View style={styles.row}>
          <DonutChart
            data={[
              {
                label: 'Chưa làm',
                value: data?.total_works?.work_overday,
                color: '#e74c3c',
              },
              {
                label: 'Đang làm',
                value: data?.total_works?.work_processing,
                color: '#f1c40f',
              },
              {
                label: 'Hoàn thành',
                value: data?.total_works?.work_done,
                color: '#2ecc71',
              },
            ]}
            size={sizeChart}
            strokeWidth={sizeChart / 8}
          />
          {data?.total_work !== 0 && (
            <View
              style={{
                position: 'absolute',
                left: sizeChart / 2,
                top: sizeChart / 2,
                transform: [
                  { translateX: -sizeChart / 2 },
                  { translateY: -sizeChart / 2 },
                ],
                width: sizeChart,
                height: sizeChart,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.chartNumber}>{data?.total_work}</Text>
              <Text style={styles.chartLabel}>CÔNG VIỆC</Text>
            </View>
          )}

          <View style={{ width: 15 }} />

          <View style={styles.statList}>
            <StatRow
              color="#2ecc71"
              text={`${data?.total_works?.work_done} Công việc hoàn thành`}
            />
            <StatRow
              color="#f1c40f"
              text={`${data?.total_works?.work_processing} Công việc đang thực hiện`}
            />
            <StatRow
              color="#e74c3c"
              text={`${data?.total_works?.work_overday} Công việc trễ hạn`}
            />
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Báo cáo thống kê sự cố</Text>

        <View style={[styles.row, { alignItems: 'center' }]}>
          {data?.total_cause !== 0 && (
            <View style={styles.chartPlaceholder}>
              <Text style={styles.chartNumber}>{data?.total_cause}</Text>
              <Text style={styles.chartLabel}>TỔNG SỰ CỐ</Text>
            </View>
          )}

          <View style={styles.statList}>
            <StatRow
              color="#e74c3c"
              text={`${data?.cause_not_done?.total_cause_not_done} Sự cố chưa hoàn thành`}
            />
            {data?.cause_not_done?.items?.map(item => {
              return (
                <StatRowTitle
                  key={item?.priority_id}
                  color={getPriorityColor(item?.code)}
                  text={`${item?.count} ${item?.name}`}
                />
              );
            })}

            <View style={{ height: 8 }} />

            <StatRow
              color="#2ecc71"
              text={`${data?.cause_done?.total_cause_done} Sự cố đã hoàn thành`}
            />
            {data?.cause_done?.items?.map(item => {
              return (
                <StatRowTitle
                  key={item?.priority_id}
                  color={getPriorityColor(item?.code)}
                  text={`${item?.count} ${item?.name}`}
                />
              );
            })}
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Top 5 nhân viên xuất sắc</Text>

        {data?.top_employees?.map(emp => (
          <EmployeeItem key={emp.employee_id} employee={emp} />
        ))}
      </View>
    </Fragment>
  );
};

const StatRow = ({ color, text }: any) => (
  <View style={styles.statRow}>
    <View style={[styles.dot, { backgroundColor: color }]} />
    <Text style={styles.statText}>{text}</Text>
  </View>
);

const StatRowTitle = ({ color, text }: any) => (
  <View style={[styles.statRow, { marginLeft: 16 }]}>
    <View
      style={[styles.dot, { backgroundColor: color, width: 8, height: 8 }]}
    />
    <Text style={[styles.statText, { fontSize: 12 }]}>{text}</Text>
  </View>
);

const EmployeeItem = ({ employee }: any) => (
  <View style={styles.employeeRow}>
    {!employee?.avatar ? (
      <Image source={AVATAR_DEFAULT} style={styles.avatar} />
    ) : (
      <Image source={{ uri: employee?.avatar }} style={styles.avatar} />
    )}

    <View style={{ flex: 1 }}>
      <Text style={styles.employeeName}>{employee?.employee_name}</Text>
      <Text style={styles.employeeSub}>
        Đã giao: {employee?.total_assigned}
      </Text>
    </View>

    <View style={styles.badge}>
      <Text style={styles.badgeText}>HOÀN THÀNH: {employee?.total_done}</Text>
    </View>
  </View>
);
