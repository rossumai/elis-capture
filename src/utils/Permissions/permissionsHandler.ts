import { Alert, Platform } from 'react-native';
import { check, openSettings, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

// tslint:disable-next-line:no-var-requires
const alertMessagesJson = require('./alertMessages.json');

type permissionsT = 'camera' | 'photo';

export const alertMessages = {
  camera: {
    main: alertMessagesJson.permissions.alert_messages.camera.main,
    sub: alertMessagesJson.permissions.alert_messages.camera.sub,
  },
  photo: {
    main: alertMessagesJson.permissions.alert_messages.camera_roll.main,
    sub: alertMessagesJson.permissions.alert_messages.camera_roll.sub,
  },
};

type askForPermissionsIosT = () => Promise<boolean>;
const askForPermissionsCameraIos: askForPermissionsIosT = async () => {
  const status = await request(PERMISSIONS.IOS.CAMERA);
  return status === 'granted';
};

type askForPermissionsCameraAndroidT = () => Promise<boolean>;
const askForPermissionsCameraAndroid: askForPermissionsCameraAndroidT = async () => {
  const status = await request(PERMISSIONS.ANDROID.CAMERA);
  return status === 'granted';
};

const askForPermissionsLibraryIos: askForPermissionsIosT = async () => {
  const status = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
  return status === 'granted';
};

type handlePermissionsT = () => () => Promise<boolean>;

export const handlePermissionsCamera: handlePermissionsT = () => async () => {
  if (Platform.OS === 'ios') {
    const hasPermissions = await handlePermissionsCameraIos()();
    return hasPermissions;
  } else {
    const hasPermissions = await handlePermissionsCameraAndroid()();
    return hasPermissions;
  }
};

const handlePermissionsCameraIos: handlePermissionsT = () => async () => {
  const status = await check(PERMISSIONS.IOS.CAMERA);
  switch (status) {
    case RESULTS.GRANTED:
      return true;
    case RESULTS.BLOCKED:
      showAlert('camera');
      return false;
    case RESULTS.DENIED:
      return askForPermissionsCameraIos();
    case RESULTS.UNAVAILABLE:
      return false;
    default:
      return false;
  }
};

export const handlePermissionsLibraryIos: handlePermissionsT = () => async () => {
  const status = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
  switch (status) {
    case RESULTS.GRANTED:
      return true;
    case RESULTS.BLOCKED:
      showAlert('photo');
      return false;
    case RESULTS.DENIED:
      return askForPermissionsLibraryIos();
    case RESULTS.UNAVAILABLE:
      return false;
    default:
      return false;
  }
};

const handlePermissionsCameraAndroid: handlePermissionsT = () => async () => {
  const status = await check(PERMISSIONS.ANDROID.CAMERA);
  switch (status) {
    case RESULTS.GRANTED:
      return true;
    case RESULTS.BLOCKED:
      return askForPermissionsCameraAndroid();
    case RESULTS.DENIED:
      return askForPermissionsCameraAndroid();
    case RESULTS.UNAVAILABLE:
      return false;
    default:
      return false;
  }
};

type showAlertPermissionsT = (permission: permissionsT) => void;
export const showAlert: showAlertPermissionsT = permission => {
  Alert.alert(
    alertMessages[permission].main,
    alertMessages[permission].sub,
    [
      {
        text: alertMessagesJson.permissions.alert_button_text.go_to_settings,
        onPress: () => handleGoToSettings(),
      },
      {
        text: alertMessagesJson.permissions.alert_button_text.cancel,
        style: 'cancel',
      },
    ],
    { cancelable: true },
  );
};

const handleGoToSettings: () => void = () => {
  openSettings().catch(() => console.warn('cannot open settings'));
};
