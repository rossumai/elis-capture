import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

type Props = { onPress: () => void };

const AddPagesButton = ({ onPress }: Props) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      height: 70,
      flex: 1,
      width: '100%',
      bottom: 65,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#979797',
        borderRadius: 80,
        width: 70,
        height: 70,
      }}>
      <Icon name="plus" type="material-community" color="white" />
      <Text style={{ color: 'white', fontSize: 11 }}>add pages</Text>
    </View>
  </TouchableOpacity>
);

export default AddPagesButton;
