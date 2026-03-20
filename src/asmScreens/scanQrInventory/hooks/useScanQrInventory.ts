import { useAppRoute, useAppNavigation } from '@/navigation/NavigationService';
import { hideLoading, showLoading } from '@/redux/slices/loadingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import {
  getAssetDetail,
  getAssetsByLocation,
  getInventoryLine,
  getScanQrCodeInfo,
  updateInventoryLine,
} from '@/services/asset';
import { appEvent } from '@/utils/appEvent';
import { showErrorToast, showSuccesToast } from '@/utils/toast';
import { useEffect, useRef, useState } from 'react';
import {
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

const useScanQrInventory = () => {
  const user = useAppSelector(state => state.auth.userAsm);
  const route = useAppRoute<'ScanQrInventoryScreen'>();
  const { locationId, inventoryId } = route.params;
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const scannedRef = useRef(false);

  const [assetByLocation, setAssetByLocation] = useState<AssetByLocation[]>([]);
  const [scanQrCodeInfor, setScanQrCodeInfor] = useState<ScanQrCodeInfor[]>([]);
  const [inventoryLine, setInventoryLine] = useState<InventoryLine>();

  const [asset, setAsset] = useState({
    assetCode: String,
    assetId: Number,
  });

  const [showBottomSheetAssetLocation, setShowBottomSheetAssetLocation] =
    useState(false);

  const [showBottomSheetSelectObject, setShowBottomSheetSelectObject] =
    useState(false);

  const [showModalAsset, setShowModalAsset] = useState(false);

  useEffect(() => {
    scannedRef.current = false;
    if (showBottomSheetAssetLocation) {
      handleGetAssetByLocation();
    }
  }, [showBottomSheetAssetLocation]);

  const handleGetAssetByLocation = async () => {
    try {
      const res = await getAssetsByLocation({
        access_token: user?.access_token ?? '',
        inventory_id: inventoryId,
        location_id: locationId,
        key_word: '',
      });
      if (res && res.code === 200) {
        setAssetByLocation(res.data.data);
      }
    } catch (error) {
      showErrorToast({});
      console.log('error handleGetAssetByLocation', error);
    } finally {
    }
  };

  const handleGetScanQrCodeInfor = async (assetCode: string) => {
    try {
      const res = await getScanQrCodeInfo({
        access_token: user?.access_token ?? '',
        inventory_id: inventoryId,
        location_id: locationId,
        asset_code: assetCode,
      });
      if (res && res.code === 200) {
        setScanQrCodeInfor(res.data.data);
        setShowBottomSheetSelectObject(true);
      }
    } catch (error) {
      console.log('error handleGetScanQrCodeInfor', error);
      showErrorToast({});
    } finally {
    }
  };

  const handleGetInventoryLine = async (inventoryLineId: number) => {
    try {
      const res = await getInventoryLine({
        access_token: user?.access_token ?? '',
        inventory_line_id: inventoryLineId,
      });
      if (res && res.code === 200 && res.data) {
        const inventoryLine = {
          ...res.data[0],
          inventory_line_id: inventoryLineId,
        };

        console.log('inventoryLine', inventoryLine);

        setInventoryLine(inventoryLine);
        setShowModalAsset(true);
      }
    } catch (error) {
      console.log('error handleGetInventoryLine', error);
      showErrorToast({});
    } finally {
    }
  };

  const handleUpdateInventoryLine = async ({
    inventoryLineId,
    quantityUnused,
    quantityDamaged,
    quantityLiquidation,
    quantityUsing,
  }: UpdateInventoryLinePayload) => {
    try {
      const res = await updateInventoryLine({
        access_token: user?.access_token ?? '',
        inventory_line_id: inventoryLineId,
        quantity_unused: quantityUnused,
        quantity_using: quantityUsing,
        quantity_damaged: quantityDamaged,
        quantity_liquidation: quantityLiquidation,
      });
      if (res && res.code == 200) {
        showSuccesToast({ title: 'Cập nhật thành công!' });
        appEvent.emit('updated_inventory_line');
      }
    } catch (error) {
      console.log('error handleUpdateInventoryLine', error);
      showErrorToast({});
    } finally {
      setShowModalAsset(false);
    }
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: async codes => {
      if (scannedRef.current) return;
      if (codes.length > 0) {
        const value = codes[0]?.value;
        try {
          const dataScan = JSON.parse(value ?? '');
          scannedRef.current = true;
          if (dataScan) {
            console.log('datascan', dataScan);

            if (dataScan?.asset_id) {
              try {
                const assetCode = await handlGetAsset(dataScan?.asset_id);
                if (assetCode && assetCode !== null) {
                  await handleGetScanQrCodeInfor(assetCode);
                  scannedRef.current = false;
                }
              } catch (error) {}
            }
          }

          // onScanSuccess?.(dataScan);
          // navigation.goBack();
        } catch (err) {
          console.log('Invalid QR content:', err);
        }
      }
    },
  });

  const handlGetAsset = async (id: number) => {
    try {
      dispatch(showLoading());
      const res = await getAssetDetail({
        access_token: user?.access_token ?? '',
        company_id: user?.company_id.id ?? 0,
        business_unit_id: user?.business_unit_id.id ?? 0,
        page: 1,
        items_per_page: 1,
        id: id,
      });
      if (res && res.code === 200) {
        return res.data.asset_code;
      }
      return null;
    } catch (error) {
      console.log('error handlGetAsset', error);
      showErrorToast({});
      return null;
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleNavigateSummary = () =>
    navigation.navigate('InventorySummaryScreen', {
      locationId,
      inventoryId,
      inventoried: false,
    });

  return {
    assetByLocation,
    showBottomSheetAssetLocation,
    setShowBottomSheetAssetLocation,
    handleGetScanQrCodeInfor,
    showBottomSheetSelectObject,
    setShowBottomSheetSelectObject,
    scanQrCodeInfor,
    showModalAsset,
    setShowModalAsset,
    handleGetInventoryLine,
    inventoryLine,
    handleUpdateInventoryLine,
    device,
    hasPermission,
    codeScanner,
    handleNavigateSummary,
  };
};

export default useScanQrInventory;

export interface AssetByLocation {
  inventory_line_id: number;
  asset_id: number;
  asset_name: string;
  asset_code: string;
  asset_user: string;
  type_code: string;
  type_name: string;
  type_type: string;
  quantity_total: number;
  uom_id: string;
  qty_inventoried: number;
  total_inventory: number;
}

export interface ScanQrCodeInfor {
  id: number;
  asset_user: string;
  employee: Employee;
  department: Department;
  representative: Representative;
}

export interface Employee {
  id: boolean | number;
  name: boolean | string;
}

export interface Department {
  id: boolean | number;
  name: boolean | string;
}

export interface Representative {
  id: boolean | number;
  name: boolean | string;
}

export interface InventoryLine {
  id: number;
  asset_name: string;
  asset_code: string;
  images: any[];
  asset_type: AssetType;
  employee: Employee;
  department: Department;
  representative: Representative;
  location: Location;
  theory_qty_unused: number;
  theory_qty_using: number;
  theory_qty_damaged: number;
  theory_qty_liquidation: number;
  quantity_total: number;
  quantity_unused: number;
  quantity_using: number;
  quantity_damaged: number;
  quantity_liquidation: number;
  quantity_total_real: number;
  is_inventoried: boolean;
  real_qty_unused_unlisted: number;
  real_qty_using_unlisted: number;
  real_qty_damaged_unlisted: number;
  real_qty_liquidation_unlisted: number;
  real_qty_total_unlisted: number;
  inventory_line_id: number;
}

export interface AssetType {
  id: number;
  code: string;
  name: string;
}

export interface Location {
  id: number;
  name: string;
  code: string;
}

interface UpdateInventoryLinePayload {
  inventoryLineId: number;
  quantityUnused: number;
  quantityUsing: number;
  quantityDamaged: number;
  quantityLiquidation: number;
}
