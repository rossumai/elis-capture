import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import loader from '../../images/loader.json';

const PhotoLoader = () => (
  <View
    style={{
      flex: 1,
      zIndex: 1,
      position: 'absolute',
      left: '30%',
      top: '30%',
      width: '40%',
      height: '40%',
    }}
  >
    <LottieView
      source={loader}
      autoPlay
      loop
    />
  </View>
);

export default PhotoLoader;
