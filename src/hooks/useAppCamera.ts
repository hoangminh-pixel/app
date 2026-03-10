import { Alert, Linking } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import * as ImagePicker from 'react-native-image-picker';
import { MediaType } from 'react-native-image-picker';
import moment from 'moment';
import { useState } from 'react';

export type MediaTypeRes = {
  name: string;
  url: string;
  type: MediaType;
};

const useAppCamera = () => {
  const [mediaResponse, setMediaResponse] = useState<MediaTypeRes[]>([]);
  const [loading, setLoading] = useState(false);

  const requestPermission = async () => {
    const permission = await Camera.requestCameraPermission();

    if (permission === 'denied') {
      Alert.alert(
        'Yêu cầu quyền',
        'Để có thể truy cập camera. Vui lòng mở Cài đặt để bật lại.',
        [
          { text: 'Hủy', style: 'cancel' },
          {
            text: 'Mở Cài đặt',
            onPress: () => Linking.openSettings(),
          },
        ],
      );
      return false;
    }

    return permission === 'granted';
  };

  const openCamera = async (mediaType: MediaType) => {
    try {
      setLoading(true);

      const hasPermission = await requestPermission();
      if (!hasPermission) return;

      const response = await ImagePicker.launchCamera({
        mediaType,
        quality: 0.7,
        videoQuality: 'medium',
        durationLimit: 60,
        saveToPhotos: false,
        cameraType: 'back',
      });

      if (
        response.didCancel ||
        response.errorCode ||
        !response.assets?.length
      ) {
        console.log('Camera cancelled or failed');
        return;
      }

      const asset = response.assets[0];
      const fileName = getFileName(asset, mediaType);

      setMediaResponse(prev => [
        ...prev,
        {
          name: fileName,
          url: asset.uri ?? '',
          type: mediaType,
        },
      ]);
    } catch (error) {
      console.log('error useAppCamera', error);
    } finally {
      setLoading(false);
    }
  };

  const removeMedia = (index: number) => {
    const newList = [...mediaResponse];
    newList.splice(index, 1);
    setMediaResponse(newList);
  };

  return {
    mediaResponse,
    openCamera,
    loading,
    removeMedia,
  };
};

const getFileName = (asset: any, mediaType: MediaType) => {
  const ext =
    asset.fileName?.split('.').pop() ||
    asset.type?.split('/').pop() ||
    (mediaType === 'photo' ? 'jpg' : 'mp4');

  const prefix = mediaType === 'photo' ? 'IMG' : 'VID';

  return `${prefix}_${moment().format('YYYYMMDD_HHmmss_SSS')}.${ext}`;
};

export default useAppCamera;
