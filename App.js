/* @flow */
import {
  NativeRouter,
  Route,
} from 'react-router-native';
import React from 'react';
import { ScreenOrientation } from 'expo';
import { Provider } from 'react-redux';
import {
  StyleSheet,
  View,
} from 'react-native';
import CameraHandler from './src/components/CameraHandler';
import Login from './src/components/Login';
import store from './src/redux/configureStore';
import Routing from './src/decorators/routing';
import Splash from './src/components/Splash';

ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);

const App = () => (
  <Provider store={store}>
    <NativeRouter>
      <View style={styles.container}>
        <Routing />
        <Route exact path="/" component={Splash} />
        <Route exact path="/login" component={Login} />
        <Route path="/camera" component={CameraHandler} />
      </View>
    </NativeRouter>
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
  },
});

export default App;
