import React from 'react';
import { View } from 'react-native';
import { CapturedPicture } from '../Camera';
import { FlashMode } from '../CameraHandler';
import CenterFooter from './components/CenterFooter';
import LeftFooter from './components/LeftFooter';
import RightFooter from './components/RightFooter';

type Props = {
  lastFile: null | CapturedPicture;
  pagesCount: number;
  flashMode: FlashMode;
  shooting: boolean;
  openPreview: () => void;
  onFlashModeChange: () => void;
  shoot: () => void;
  send: () => void;
  sizeLimitExceeded: boolean;
  addFileFromLibrary: () => Promise<void>;
};

const CameraFooter = ({
  openPreview,
  lastFile,
  pagesCount,
  shoot,
  onFlashModeChange,
  flashMode,
  shooting,
  sizeLimitExceeded,
  send,
  addFileFromLibrary,
}: Props) => (
  <View
    style={{
      position: 'absolute',
      flex: 1,
      bottom: 30,
      flexDirection: 'row',
      width: '80%',
      marginLeft: '10%',
      marginRight: '10%',
    }}>
    <LeftFooter
      openPreview={openPreview}
      lastFile={lastFile}
      shooting={shooting}
      pagesCount={pagesCount}
      addFileFromLibrary={addFileFromLibrary}
    />
    <CenterFooter sizeLimitExceeded={sizeLimitExceeded} shoot={shoot} />
    <RightFooter
      sizeLimitExceeded={sizeLimitExceeded}
      showSend={!!pagesCount}
      onFlashModeChange={onFlashModeChange}
      flashMode={flashMode}
      send={send}
    />
  </View>
);

export default CameraFooter;
