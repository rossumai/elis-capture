/* @flow */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { checkToken } from '../../redux/modules/user/actions';

type Props = { onLoad: Function }

const styles = StyleSheet.create({
  Splash: {
    backgroundColor: '#1b1922',
    height: '100%',
  },
});

const Splash = ({ onLoad }: Props) => {
  onLoad();
  return <View style={styles.Splash} />;
};
const mapDispatchToProps = { onLoad: checkToken };

export default connect(null, mapDispatchToProps)(Splash);
