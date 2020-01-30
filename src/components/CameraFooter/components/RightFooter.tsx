import React from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { FlashMode } from '../../CameraHandler';

const flashModes = {
  on: 'flash',
  auto: 'flash-auto',
  off: 'flash-off',
};

type Props = {
  onFlashModeChange: () => void;
  flashMode: FlashMode;
  send: () => void;
  showSend: boolean;
  sizeLimitExceeded: boolean;
};

const RightFooter = ({
  onFlashModeChange,
  flashMode,
  showSend,
  send,
  sizeLimitExceeded,
}: Props) => (
  <View
    style={{
      flex: 1,
      justifyContent: 'space-around',
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    }}>
    <TouchableWithoutFeedback onPress={onFlashModeChange}>
      <Icon color="white" name={flashModes[flashMode]} type="material-community" size={30} />
    </TouchableWithoutFeedback>
    {showSend && (
      <TouchableOpacity
        onPress={send}
        disabled={sizeLimitExceeded}
        style={{ opacity: sizeLimitExceeded ? 0.5 : 1 }}>
        <Icon name="send" color="white" />
      </TouchableOpacity>
    )}
  </View>
);

export default RightFooter;
