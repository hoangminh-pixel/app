import useAppCamera from '@/hooks/useAppCamera';
import { hideLoading, showLoading } from '@/redux/slices/loadingSlice';
import { useAppDispatch } from '@/redux/store/hooks';
import { showErrorToast } from '@/utils/toast';
import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import jsQR from 'jsqr';
import jpeg from 'jpeg-js';
import { Buffer } from 'buffer';
import { useAppNavigation, useAppRoute } from '@/navigation/NavigationService';
const PNG = require('pngjs/browser').PNG;

export const SCAN_SIZE = 260;

const useScanCode = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const route = useAppRoute<'QRScannerScreen'>();
  const { onScanSuccess } = route.params ?? {};

  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const scanAnim = useRef(new Animated.Value(0)).current;
  const scannedRef = useRef(false);

  useEffect(() => {
    scannedRef.current = false;
    requestPermission();
    //     Animated.loop(
    //       Animated.timing(scanAnim, {
    //         toValue: 1,
    //         duration: 2000,
    //         useNativeDriver: true,
    //       }),
    //     ).start();
  }, []);

  const scanTranslate = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, SCAN_SIZE - 1],
  });

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (scannedRef.current) return;
      if (codes.length > 0) {
        const value = codes[0]?.value;
        try {
          const dataScan = JSON.parse(value ?? '');
          scannedRef.current = true;
          console.log('datascan', dataScan);

          onScanSuccess?.(dataScan);
          navigation.goBack();
        } catch (err) {
          console.log('Invalid QR content:', err);
        }
      }
    },
  });

  const readQRFromGallery = () => {
    try {
      launchImageLibrary(
        {
          selectionLimit: 1,
          mediaType: 'photo',
          includeBase64: true,
          maxWidth: 800,
          maxHeight: 800,
          quality: 0.4,
        },
        ({ didCancel, assets, errorCode }) => {
          try {
            if (didCancel) {
              console.log('Người dùng hủy chọn ảnh');
              return;
            }
            if (errorCode) {
              showErrorToast({ content: 'Không thể mở thư viện ảnh.' });
              console.log('Lỗi khi chọn ảnh:', errorCode);
              return;
            }
            if (!assets || assets.length === 0) {
              console.log('Không có ảnh nào được chọn');
              return;
            }

            console.log('select');
            dispatch(showLoading());
            const image = assets[0];
            if (!image.base64) {
              console.log('Ảnh không có dữ liệu base64');
              return;
            }

            // dispatch(hideLoading());

            const base64Buffer = Buffer.from(image.base64, 'base64');

            let pixelData;
            let imageBuffer;

            if (image.type === 'image/jpeg' || image.type === 'image/jpg') {
              pixelData = jpeg.decode(base64Buffer, { useTArray: true });
              imageBuffer = pixelData.data;
            } else if (image.type === 'image/png') {
              pixelData = PNG.sync.read(base64Buffer);
              imageBuffer = pixelData.data;
            } else {
              showErrorToast({ content: 'Định dạng ảnh không được hỗ trợ.' });
              console.log('Định dạng ảnh không được hỗ trợ:', image.type);
              return;
            }

            const data = Uint8ClampedArray.from(imageBuffer);
            const code = jsQR(data, image.width ?? 0, image.height ?? 0);

            if (code) {
              const dataScan = JSON.parse(code.data);
              dispatch(hideLoading());
              onScanSuccess?.(dataScan);
              navigation.goBack();
              console.log('QR content:', code.data);
            } else {
              dispatch(hideLoading());
              showErrorToast({
                content: 'Không tìm thấy mã QR trong ảnh đã chọn.',
              });

              console.log('Không tìm thấy QR trong ảnh');
            }
          } catch (innerErr) {
            dispatch(hideLoading());
            showErrorToast({
              content: 'Có lỗi xảy ra khi xử lý ảnh.',
            });

            console.log('Lỗi khi xử lý ảnh:', innerErr);
          } finally {
            dispatch(hideLoading());
          }
        },
      );
    } catch (err) {
      showErrorToast({
        content: 'Không thể truy cập thư viện ảnh.',
      });
      console.log('Lỗi khi mở thư viện ảnh:', err);
      dispatch(hideLoading());
    } finally {
    }
  };
  return {
    readQRFromGallery,
    device,
    hasPermission,
    scanTranslate,
    codeScanner,
  };
};

export default useScanCode;

export interface RootScanQR {
  asset_id: AssetId;
  mro_location_id: MroLocationId;
  asset_category_level1_id: AssetCategoryLevel1Id;
  zone_id: ZoneId;
  request_department_id: RequestDepartmentId;
  receive_department_id: ReceiveDepartmentId;
}

export interface AssetId {
  id: number;
  name: string;
}

export interface MroLocationId {
  id: boolean;
  name: string;
}

export interface AssetCategoryLevel1Id {
  id: number;
  name: string;
}

export interface ZoneId {
  id: boolean;
  name: string;
}

export interface RequestDepartmentId {
  id: number;
  name: string;
}

export interface ReceiveDepartmentId {
  id: number;
  name: string;
}
