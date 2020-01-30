import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

const logo = require('../../../images/logo2.png');

type Props = { shoot: () => void; sizeLimitExceeded: boolean };

const CenterFooter = ({ sizeLimitExceeded, shoot }: Props) => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <TouchableOpacity
      style={{
        backgroundColor: 'white',
        opacity: sizeLimitExceeded ? 0.5 : 1,
        borderRadius: 40,
        width: 70,
        height: 70,
        padding: 10,
      }}
      disabled={sizeLimitExceeded}
      onPress={shoot}>
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
