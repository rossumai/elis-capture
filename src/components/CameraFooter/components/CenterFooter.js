/* @flow */
import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import logo from '../../../images/logo2.png';

type Props = { shoot: Function }

const CenterFooter = ({ shoot }: Props) => (
  <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }}
  >
    <TouchableOpacity
      style={{
        backgroundColor: 'white',
        borderRadius: 40,
        width: 70,
        height: 70,
        padding: 10,
      }}
      onPress={shoot}
    >
      <Image
        source={logo}
        style={{
          width: 50,
          height: 50,
        }}
      />
    </TouchableOpacity>
  </View>
);

export default CenterFooter;
