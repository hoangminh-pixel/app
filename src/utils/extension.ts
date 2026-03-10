import { Platform } from 'react-native';

const getMimeType = (file: any) => {
  if (file.name?.endsWith('.jpg') || file.name?.endsWith('.jpeg')) {
    return 'image/jpeg';
  }
  if (file.name?.endsWith('.png')) {
    return 'image/png';
  }
  if (file.name?.endsWith('.mp4')) {
    return 'video/mp4';
  }
  return 'application/octet-stream';
};

export const createFormData = ({ files, body }: any) => {
  const data = new FormData();

  files?.forEach((file: { name: any; url: string }, index: any) => {
    data.append('image', {
      name: file.name,
      type: getMimeType(file),
      uri:
        Platform.OS === 'android'
          ? file?.url
          : file?.url?.replace('file://', ''),
    });
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};
