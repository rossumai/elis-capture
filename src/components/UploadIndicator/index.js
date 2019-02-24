import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const UploadIndicator = () => (
  <View
    style={{
      flex: 1,
      zIndex: 2,
      position: 'absolute',
      left: 20,
      top: 10,
    }}
  >
    <Animatable.View
      animation="fadeOut"
      easing="ease-in"
      iterationCount="infinite"
    >
      <Icon
        name="cloud-upload"
        type="material-community"
        color="white"
        size={30}
      />
    </Animatable.View>
  </View>
);

export default UploadIndicator;
