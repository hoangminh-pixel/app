export type AuthStackParamList = {
  Login: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  BottomTab: undefined;
  DetailMaintenanceScreen: { id: number; onGoBack: () => void };
  DetailRepairScreen: { id: number; onGoBack: () => void };
  SuppliesScreen: { id: number; onGoBack: () => void };
  CreateRepairRequestScreen: {
    id: number;
    onGoBack: () => Promise<void>;
    state?: string;
    author?: string;
  };
  CreateReportProbemScreen: { id: number; onGoBack: () => Promise<void> };
  DetailRequestScreen: { id: number; onGoBack: () => Promise<void> };
  ListJobTodayScreen: { state: string };
  SettingScreen: undefined;
  QRScannerScreen: {
    onScanSuccess?: (data: any) => void;
  };
  DetailMediaScreen: { url: string; mediaType: string };
};
