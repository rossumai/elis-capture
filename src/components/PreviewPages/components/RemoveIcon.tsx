import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

type Props = { remove: () => void };

const RemoveIcon = ({ remove }: Props) => (
  <TouchableOpacity
    onPress={remove}
    style={{
      marginLeft: 10,
      width: 30,
      height: 30,
    }}
  >
    <Icon name="delete" color="white" size={30} />
  </TouchableOpacity>
);

export default RemoveIcon;
