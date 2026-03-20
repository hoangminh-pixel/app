import { InventoringRes } from '@/asmScreens/inventory/inventorying/hooks/useInventorying';

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

export type AssetStackParamList = {
  Home: undefined;
  BottomTab: undefined;
  SettingScreen: undefined;
  AssetDetailScreen: { id: number };
  MarkBrokenScreen: { id: number };
  MarkLostScreen: { id: number };
  InventoryDetailScreen: { item: InventoringRes; inventoried: boolean };
  ScanQrInventoryScreen: { locationId: number; inventoryId: number };
  InventorySummaryScreen: {
    locationId: number;
    inventoryId: number;
    inventoried: boolean;
  };
  InventoryResultScreen: {
    locationId: number;
    inventoryId: number;
    indexType: number;
  };
  InventoryResultDetailScreen: {
    locationId: number;
    inventoryId: number;
    assetId: number;
  };
};
