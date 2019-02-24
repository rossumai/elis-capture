import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { range } from 'lodash';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  Pagiantion: {
    position: 'absolute',
    bottom: '14%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  PassiveDot: {
    opacity: 0.6,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 10,
    height: 10,
    marginHorizontal: 10,
  },
  ActiveDot: {
    opacity: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 10,
    height: 10,
    marginHorizontal: 10,
  },
  CameraIcon: {
    opacity: 0.6,
    marginHorizontal: 10,
  },
});

const Pagiantion = addPages => (currentIndex, total) => (
  <View style={styles.Pagiantion}>
    {range(total).map(index =>
      (index === currentIndex)
        ? <View key="active-dot" style={styles.ActiveDot} />
        : index + 1 === total
          ? (
            <TouchableOpacity key="camera-dot" onPress={addPages}>
              <Icon
                iconStyle={styles.CameraIcon}
                type="material-community"
                color="white"
                name="camera"
                size={20}
              />
            </TouchableOpacity>
          )
          : <View key={index} style={styles.PassiveDot} />)}
  </View>
);

export default Pagiantion;
