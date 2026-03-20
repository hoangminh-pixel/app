import { BasePage } from '@/components';
import BottomSheetAssetLocation from '@/components/BottomSheetAssetLocation';
import Icon from '@react-native-vector-icons/material-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import BottomSheetSelectObject from './components/BottomSheetSelectObject';
import ModalAssetStatus from './components/ModalAssetStatus';
import useScanQrInventory from './hooks/useScanQrInventory';
import { styles } from './styles';
import { Camera } from 'react-native-vision-camera';
import SizeBox from '@/components/SizeBox';

export default function ScanQrInventoryScreen() {
  const {
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
    codeScanner,
    device,
    hasPermission,
    handleNavigateSummary,
  } = useScanQrInventory();

  //   if (!device || !hasPermission)
  //     return (
  //       <BasePage
  //         title="Quét QR"
  //         showBack
  //         edges={['bottom']}
  //         paddingHorizontal={0}
  //       >
  //         <SizeBox height={30} />
  //         <Text style={{ textAlign: 'center' }}>Camera không khả dụng</Text>
  //       </BasePage>
  //     );
  return (
    <BasePage
      title="Quét mã QR"
      showBack
      paddingHorizontal={0}
      edges={['bottom']}
    >
      <View style={styles.container}>
        {/* <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
        /> */}
        <View style={styles.camera}>
          <View style={styles.scanWrapper}>
            <View style={styles.scanBox}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />

              {/* <View style={styles.innerBorder} /> */}
            </View>
          </View>

          <View style={styles.manualWrapper}>
            <Pressable
              style={styles.manualBtn}
              onPress={() => setShowBottomSheetAssetLocation(true)}
            >
              <Icon name="keyboard" size={18} color="#fff" />
              <Text style={styles.manualText}>Nhập mã thủ công</Text>
            </Pressable>
          </View>

          <View style={styles.bottomWrapper}>
            <Pressable style={styles.bottomBtn} onPress={handleNavigateSummary}>
              <Icon name="list-alt" size={20} color="#fff" />
              <Text style={styles.bottomText}>Chi tiết kiểm kê</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <BottomSheetAssetLocation
        visible={showBottomSheetAssetLocation}
        data={assetByLocation}
        onClose={() => setShowBottomSheetAssetLocation(false)}
        onSelect={async item => {
          await handleGetScanQrCodeInfor(item.asset_code);
        }}
      />

      <BottomSheetSelectObject
        visible={showBottomSheetSelectObject}
        data={scanQrCodeInfor}
        onClose={() => setShowBottomSheetSelectObject(false)}
        onSelect={async item => {
          await handleGetInventoryLine(item.id);
        }}
      />

      <ModalAssetStatus
        visible={showModalAsset}
        onClose={() => setShowModalAsset(false)}
        onConfirm={async data => {
          await handleUpdateInventoryLine({
            inventoryLineId: data.inventoryLineId,
            quantityUnused: data.unused,
            quantityDamaged: data.broken,
            quantityLiquidation: data.liquidate,
            quantityUsing: data.using,
          });
        }}
        data={inventoryLine}
      />
    </BasePage>
  );
}
