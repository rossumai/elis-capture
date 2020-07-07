import { split } from 'lodash';
import React from 'react';
import {
  AsyncStorage,
  EmitterSubscription,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { WebViewMessage } from 'react-native-webview/lib/WebViewTypes';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { rootActionT } from '../../common/configureStore';
import { checkToken, CredentialsBody, validateCredentials } from '../../common/modules/user/actions';
import { elisRegistrationUrl } from '../../constants/config';
import { TOKEN } from '../../constants/config';
import MessageContainer from '../Message';
import Form from './components/Form';

// tslint:disable-next-line:no-var-requires
const logo = require('../../images/logo2.png');

const CHECK_STORAGE: string = `
  setTimeout(() => {
    window.ReactNativeWebView.postMessage("Storage: " + window.localStorage.getItem('secureToken'));
    true;
  }, 100);
`;

type validateCredentialsT = {
  password: string;
  username: string;
};

type WebViewRef = null | WebView;

type State = { username: string; password: string; keyboardIsOpen: boolean; webviewOpened: boolean; };
type Props = {
  validate: (credentials: validateCredentialsT) => rootActionT;
  checkToken: () => rootActionT;
};

class Login extends React.Component<Props, State> {
  keyboardDidShowListener?: EmitterSubscription;
  keyboardDidHideListener?: EmitterSubscription;
  webview: WebViewRef = null;

  state = {
    username: '',
    password: '',
    keyboardIsOpen: false,
    webviewOpened: false,
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

  onNavigationStateChange = (navigationState: WebViewNavigation) => {
    if (this.webview) {
      this.webview.injectJavaScript(CHECK_STORAGE);
    }
  };

  onMessage = (event: NativeSyntheticEvent<WebViewMessage>) => {
    const { data } = event.nativeEvent;

    if (data.includes('Storage:')) {
      const token = split(data, 'Storage: ', 2)[1];
      if (token !== 'null') {
        AsyncStorage.setItem(TOKEN, token)
        this.props.checkToken();
        return this.setState({ webviewOpened: false });
      }
      return;
    }
  };

  renderWebview() {
    return (
      <>
        <StatusBar hidden={false} barStyle="dark-content" />
        <View style={styles.headerContainter}>
          <Text style={styles.headingWebview}>Elis Registration</Text>
          <TouchableOpacity
            style={styles.arrowBack}
            onPress={() => this.setState({ webviewOpened: false })}>
            <Icon name="arrow-left" type="material-community" color="#008fff" size={30} />
          </TouchableOpacity>
        </View>
        <WebView
          ref={ref => (this.webview = ref)}
          source={{
            uri: elisRegistrationUrl,
          }}
          allowsBackForwardNavigationGestures={true}
          onNavigationStateChange={this.onNavigationStateChange}
          onMessage={this.onMessage}
          startInLoadingState={true}
        />
      </>
    );
  }

  render() {
    const { username, password, keyboardIsOpen, webviewOpened } = this.state;
    const { validate } = this.props;
    return webviewOpened ? (
      this.renderWebview()
    ) : (
      <View style={styles.backgroundContainer}>
        <StatusBar hidden={false} barStyle="light-content" />
        <KeyboardAvoidingView
          behavior={Platform.select({ android: undefined, ios: 'padding' })}
          style={styles.container}>
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
                  ROSSUM
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
        {!keyboardIsOpen && (
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => this.setState({ webviewOpened: true })}>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 13,
                }}>
                Don't have an account?
              </Text>
              <Text>{'  '}</Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 13,
                  fontWeight: 'bold',
                }}>
                Sign up.
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: '#1b1922',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  container: {
    backgroundColor: '#1b1922',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  signUpButton: {
    width: 225,
    height: 40,
    opacity: 0.99,
    marginBottom: 28,
    borderRadius: 10,
    backgroundColor: '#646464',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowBack: {
    height: 30,
    width: 50,
    position: "absolute",
    top: 30,
  },
  headingWebview: {
    color: '#1b1922',
    fontSize: 20,
    letterSpacing: 1,
    textAlign: 'center',
    paddingTop: 35,
  },
  headerContainter: {
    height: 70,
    backgroundColor: 'white',
    borderBottomColor: '#008fff',
    borderBottomWidth: 2,
  }
});

const mapDispatchToProps = (dispatch: Dispatch<rootActionT>) => ({
  validate: (body: CredentialsBody) => dispatch(validateCredentials(body)),
  checkToken: () => dispatch(checkToken()),
});

export default connect(null, mapDispatchToProps)(Login);
