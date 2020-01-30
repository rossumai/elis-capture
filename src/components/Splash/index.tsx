import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { checkToken } from '../../common/modules/user/actions';

type Props = { onLoad: () => void };

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
