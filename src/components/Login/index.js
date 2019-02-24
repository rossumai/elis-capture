/* @flow */
import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { connect } from 'react-redux';
import { validateCredentials } from '../../redux/modules/user/actions';
import Form from './components/Form';

import logo from '../../images/logo2.png';
import Message from '../Message';

type State = { username: string, password: string, keyboardIsOpen: boolean }
type Props = { validate: Function }

class Login extends React.Component<Props, State> {
  keyboardDidShowListener = {};

  keyboardDidHideListener = {};

  constructor(props: Props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      keyboardIsOpen: false,
    };
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow = () =>
    this.setState({ keyboardIsOpen: true });

  keyboardDidHide = () =>
    this.setState({ keyboardIsOpen: false });

  render() {
    const { username, password, keyboardIsOpen } = this.state;
    const { validate } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Message />
        <View style={{
          flex: keyboardIsOpen ? 0.5 : 2,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
        >
          {keyboardIsOpen || <Image source={logo} style={{ width: 70, height: 70 }} />}
          <View style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 10,
          }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text style={{
                color: 'white',
                fontSize: 20,
                letterSpacing: 1,
                fontWeight: 'bold',
              }}
              >
                ELIS
              </Text>
              <Text>{'   '}</Text>
              <Text style={{
                color: 'white',
                fontSize: 20,
                letterSpacing: 1,
              }}
              >
                CAPTURE
              </Text>
            </View>
            <Text style={{ color: 'white', opacity: 0.7 }}>
              by ROSSUM
            </Text>
          </View>
        </View>
        <Form
          onSubmit={() => validate({ password, username })}
          username={username}
          password={password}
          onPasswordChange={value =>
            this.setState({ password: value })}
          onUsernameChange={value =>
            this.setState({ username: value })}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b1922',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

const mapDispatchToProps = dispatch => ({
  validate: (...args) => dispatch(validateCredentials(...args)),
});

export default connect(null, mapDispatchToProps)(Login);
