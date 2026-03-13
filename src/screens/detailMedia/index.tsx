import { BasePage } from '@/components';
import { useAppRoute } from '@/navigation/NavigationService';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Video from 'react-native-video';

const DetailMediaScreen = () => {
  const route = useAppRoute<'DetailMediaScreen'>();
  const { url, mediaType } = route.params;
  return (
    <BasePage
      title="Xem chi tiết"
      showBack
      paddingHorizontal={0}
      containerStyle={{ backgroundColor: '#000' }}
    >
      <View style={styles.content}>
        {mediaType === 'photo' ? (
          <Image
            source={{ uri: url }}
            style={styles.media}
            resizeMode="contain"
          />
        ) : (
          <Video
            source={{ uri: url }}
            style={styles.media}
            resizeMode="contain"
            controls
          />
        )}
      </View>
    </BasePage>
  );
};

export default DetailMediaScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },

  media: {
    width: '100%',
    height: '80%',
  },
});
