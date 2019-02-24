/* @flow */
import { View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';
import type { FlashMode } from '../../CameraHandler';

const flashModes = {
  on: 'flash',
  auto: 'flash-auto',
  off: 'flash-off',
};

type Props = {
  onFlashModeChange: Function,
  flashMode: FlashMode,
  send: Function,
  showSend: boolean,
}

const RightFooter = ({
  onFlashModeChange,
  flashMode,
  showSend,
  send,
}: Props) => (
  <View
    style={{
      flex: 1,
      justifyContent: 'space-around',
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    }}
  >
    <TouchableWithoutFeedback onPress={onFlashModeChange}>
      <Icon
        color="white"
        name={flashModes[flashMode]}
        type="material-community"
        size={30}
      />
    </TouchableWithoutFeedback>
    {showSend && (
      <TouchableOpacity onPress={send}>
        <Icon
          name="send"
          color="white"
        />
      </TouchableOpacity>
    )}
  </View>
);

export default RightFooter;
