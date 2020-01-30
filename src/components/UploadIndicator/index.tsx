import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Icon} from 'react-native-elements';

const UploadIndicator = () => (
  <View style={styles.indicatorWrapper}>
    <Animatable.View
      animation="fadeOut"
      easing="ease-in"
      iterationCount="infinite">
      <Icon
        name="cloud-upload"
        type="material-community"
        color="white"
        size={30}
      />
    </Animatable.View>
  </View>
);

const styles = StyleSheet.create({
  indicatorWrapper: {
    flex: 1,
    zIndex: 2,
    position: 'absolute',
    left: 20,
    top: 10,
  },
});

export default UploadIndicator;
