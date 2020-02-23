import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

type Props = { requestPermission: () => void };

const NoPermission = ({ requestPermission }: Props) => (
  <View style={styles.NoPermissionWrapper}>
    <Text style={styles.NoPermissionHeading}>Camera permission missing</Text>
    <Text style={styles.NoPermissionText}>
      There is not much we can do without your permission to use camera.
    </Text>
    <Button
      onPress={requestPermission}
      icon={{
        name: 'lock-open',
        type: 'material-community',
        color: 'white',
      }}
      title="Give permission"
      buttonStyle={styles.Button}
      backgroundColor="transparent"
    />
  </View>
);

const styles = StyleSheet.create({
  NoPermissionWrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1b1922',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  NoPermissionText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    padding: 10,
  },
  NoPermissionHeading: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    padding: 10,
  },
  Button: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    margin: 10,
  },
});

export default NoPermission;
