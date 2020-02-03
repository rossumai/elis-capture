import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { NativeRouter, Route } from 'react-router-native';
import store from './src/common/configureStore';
import CameraHandler from './src/components/CameraHandler';
import Login from './src/components/Login';
import Splash from './src/components/Splash';
import Routing from './src/decorators/routing';

const App = () => (
  <Provider store={store}>
    <NativeRouter>
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Routing />
        <Route exact={true} path="/" component={Splash} />
        <Route exact={true} path="/login" component={Login} />
        <Route path="/camera" component={CameraHandler} />
      </View>
    </NativeRouter>
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default App;
