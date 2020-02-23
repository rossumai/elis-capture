import React from 'react';
import {
  EmitterSubscription,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { rootActionT } from '../../common/configureStore';
import { CredentialsBody, validateCredentials } from '../../common/modules/user/actions';
import MessageContainer from '../Message';
import Form from './components/Form';

// tslint:disable-next-line:no-var-requires
const logo = require('../../images/logo2.png');

type validateCredentialsT = {
  password: string;
  username: string;
};

type State = { username: string; password: string; keyboardIsOpen: boolean };
type Props = {
  validate: (credentials: validateCredentialsT) => rootActionT;
};

class Login extends React.Component<Props, State> {
  keyboardDidShowListener?: EmitterSubscription;
  keyboardDidHideListener?: EmitterSubscription;

  state = {
    username: '',
    password: '',
    keyboardIsOpen: false,
  };

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    if (this.keyboardDidShowListener) {
      this.keyboardDidShowListener.remove();
    }
    if (this.keyboardDidHideListener) {
      this.keyboardDidHideListener.remove();
    }
  }

  keyboardDidShow = () => this.setState({ keyboardIsOpen: true });

  keyboardDidHide = () => this.setState({ keyboardIsOpen: false });

  render() {
    const { username, password, keyboardIsOpen } = this.state;
    const { validate } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <MessageContainer />
        <View
          style={{
            flex: keyboardIsOpen ? 1 : 2,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Image
            source={logo}
            style={keyboardIsOpen ? { width: 35, height: 35 } : { width: 70, height: 70 }}
          />
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  letterSpacing: 1,
                  fontWeight: 'bold',
                }}>
                ELIS
              </Text>
              <Text>{'   '}</Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  letterSpacing: 1,
                }}>
                CAPTURE
              </Text>
            </View>
            <Text style={{ color: 'white', opacity: 0.7 }}>by ROSSUM</Text>
          </View>
        </View>
        <Form
          onSubmit={() => validate({ password, username })}
          username={username}
          password={password}
          onPasswordChange={(value: string) => this.setState({ password: value })}
          onUsernameChange={(value: string) => this.setState({ username: value })}
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

const mapDispatchToProps = (dispatch: Dispatch<rootActionT>) => ({
  validate: (body: CredentialsBody) => dispatch(validateCredentials(body)),
});

export default connect(null, mapDispatchToProps)(Login);
