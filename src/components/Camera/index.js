/* @flow */
import React from 'react';
import { Camera as RNCamera } from 'expo';
import { View, StyleSheet, Dimensions } from 'react-native';
import CameraFooter from '../CameraFooter';
import type { FlashMode } from '../CameraHandler';
const { width, height } = Dimensions.get('window');

type Props = {
  flashMode: FlashMode,
  pagesCount: number,
  ratio: string,
  lastFile: ?Object,
  shooting: boolean,
  onFlashModeChange: Function,
  onCameraReady: Function,
  getRef: Function,
  shoot: Function,
  openPreview: Function,
  send: Function,
  sizeLimitExceeded: boolean,
}

const getRatioFraction = (ratio) => {
  const [x, y] = ratio.split(':');
  return x/y
}

const Camera = ({
  getRef,
  shoot,
  flashMode,
  onFlashModeChange,
  ratio,
  onCameraReady,
  pagesCount,
  lastFile,
  send,
  shooting,
  openPreview,
  sizeLimitExceeded,
}: Props) => (
  <View style={{
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  }}
  >
    <RNCamera
      style={{
        height: height,
        width: height / getRatioFraction(ratio)
      }}
      type={RNCamera.Constants.Type.back}
      flashMode={RNCamera.Constants.FlashMode[flashMode]}
      permissionDialogMessage="We need your access your camera, so you can take photos of your documents"
      permissionDialogTitle="Permission to use camera"
      ref={getRef}
      ratio={ratio}
      onCameraReady={onCameraReady}
      autoFocus={RNCamera.Constants.AutoFocus.on}
    />
    <CameraFooter
      sizeLimitExceeded={sizeLimitExceeded}
      openPreview={openPreview}
      lastFile={lastFile}
      shooting={shooting}
      pagesCount={pagesCount}
      shoot={shoot}
      onFlashModeChange={onFlashModeChange}
      flashMode={flashMode}
      send={send}
    />
  </View>
);

export default Camera;
