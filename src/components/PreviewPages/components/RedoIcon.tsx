import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

type Props = { redo: () => void };

const RedoIcon = ({ redo }: Props) => (
  <TouchableOpacity
    onPress={redo}
    style={{
      marginLeft: 10,
      width: 30,
      height: 30,
    }}
  >
    <Icon name="camera-party-mode" type="material-community" color="white" size={30} />
  </TouchableOpacity>
);

export default RedoIcon;
