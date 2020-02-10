import { Camera as CameraType, Camera as RNCamera } from 'expo-camera';
import React, { RefObject } from 'react';
import { Dimensions, View } from 'react-native';
import CameraFooter from '../CameraFooter';
import { FlashMode } from '../CameraHandler';

const { height } = Dimensions.get('window');

export type CapturedPicture = {
  size?: number;
  width: number;
  height: number;
  uri: string;
  base64?: string;
  exif?: boolean;
};

type Props = {
  flashMode: FlashMode;
  pagesCount: number;
  ratio: string;
  lastFile: undefined | CapturedPicture;
  shooting: boolean;
  onFlashModeChange: () => void;
  onCameraReady: () => void;
  getRef: RefObject<CameraType>;
  shoot: () => void;
  openPreview: () => void;
  send: () => void;
  sizeLimitExceeded: boolean;
};

const getRatioFraction = (ratio: string) => {
  const [x, y] = ratio.split(':').map(Number);
  return x / y;
};

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
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      width: '100%',
      height: '100%',
    }}>
    <RNCamera
      style={{
        height,
        width: height / getRatioFraction(ratio),
      }}
      type={RNCamera.Constants.Type.back}
      flashMode={RNCamera.Constants.FlashMode[flashMode]}
      ref={getRef}
      ratio={ratio}
      onCameraReady={onCameraReady}
      autoFocus={RNCamera.Constants.AutoFocus.on}
    />
    <CameraFooter
      sizeLimitExceeded={sizeLimitExceeded}
      openPreview={openPreview}
      lastFile={lastFile ? lastFile : null}
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