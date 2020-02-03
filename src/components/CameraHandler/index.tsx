import AsyncStorage from '@react-native-community/async-storage';
import { Camera as CameraType } from 'expo-camera';
import ImageManipulator from 'expo-image-manipulator';
import { last, set } from 'lodash';
import React, { useRef } from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import { Constants, FileSystem, Permissions } from 'react-native-unimodules';
import { connect } from 'react-redux';
import { Queue } from '../../common/modules/queues/reducer';
import { FLASHMODE } from '../../constants/config';
import Camera, { CapturedPicture } from '../Camera';
import { Message } from '../Message';
import NoPermission from '../NoPremission';
import PhotoLoader from '../PhotoLoader';
import Preview from '../Preview';
import QueuePicker from '../QueuePicker';
import UploadIndicator from '../UploadIndicator';

export type FlashMode = 'auto' | 'on' | 'off';

const { width, height } = Dimensions.get('window');

type Props = {
  queues: Queue[];
  currentQueueIndex?: number;
  selectQueue: () => void;
  send: (file: CapturedPicture[]) => void;
  uploading: boolean;
  fetchQueues: () => void;
};
type State = {
  permissionsGranted: boolean;
  files: CapturedPicture[];
  flashMode: FlashMode;
  ratio: string;
  showPreview: boolean;
  redoing: null | number;
  shooting: boolean;
  sizeLimitExceeded: boolean;
};

// attachments size limit
const sizeLimitMB = 15;
const sizeLimit = 15 * 1024 * 1024;

const flashModes: FlashMode[] = ['on', 'off', 'auto'];

class CameraHandler extends React.Component<Props, State> {
  camera = useRef<CameraType>(null);

  constructor(props: Props) {
    super(props);
    this.state = {
      permissionsGranted: true,
      files: [],
      flashMode: 'auto',
      ratio: '16:9',
      showPreview: false,
      redoing: null,
      shooting: false,
      sizeLimitExceeded: false,
    };
  }

  componentWillMount() {
    this.loadFlashmodeSettings();
    this.requestPermission();
    this.props.fetchQueues();
  }

  loadFlashmodeSettings = async () => {
    const flashMode = (await AsyncStorage.getItem(FLASHMODE)) || 'auto';
    this.setState({ flashMode });
  };

  requestPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permissionsGranted: status === 'granted' });
  };

  getRatio = async () => {
    if (Platform.OS === 'android' && this.camera.current) {
      // $FlowFixMe
      const ratios = await this.camera.current.getSupportedRatiosAsync();
      const maxRatio = height / width;
      let bestRatio = 0;
      let bestRatioError = 100000;
      ratios.forEach((ratio: string) => {
        if (Constants.deviceName === 'Redmi 6A' && ratio === '9:5') {
          return;
        }
        const [x, y] = ratio.split(':').map(Number);
        if (x / y < height / width && Math.abs(maxRatio - x / y) < bestRatioError) {
          bestRatioError = Math.abs(maxRatio - x / y);
          bestRatio = ratio;
        }
      });
      this.setState({
        ratio: typeof bestRatio === 'number' ? '16:9' : bestRatio,
      });
    }
  };

  shoot = async () => {
    if (this.camera.current) {
      this.setState({ shooting: true });
      const { files, redoing } = this.state;
      // $FlowFixMe
      const photo = await this.camera.current.takePictureAsync({ quality: 0.5 });

      const resizedPhoto = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: 1240 } }],
        {
          compress: 0.5,
        },
      );

      const resizedInfo = await FileSystem.getInfoAsync(resizedPhoto.uri);

      const newPhoto = { ...resizedPhoto, size: resizedInfo.size };

      const newFiles =
        typeof redoing === 'number' ? set(files, redoing, newPhoto) : [...files, newPhoto];

      const showPreview = typeof redoing === 'number' || files.length === 0;

      this.setState({
        files: newFiles,
        showPreview,
        redoing: null,
        shooting: false,
        sizeLimitExceeded: this.isSizeLimitExceeded(newFiles),
      });
    }
  };

  isSizeLimitExceeded = (newFiles: CapturedPicture[]) =>
    newFiles.reduce((acc, { size }) => (size ? acc + size : acc), 0) > sizeLimit;

  remove = (index: number) => {
    const { files } = this.state;
    if (index) {
      const newFiles = files.filter((_, i) => index !== i);
      this.setState({
        files: newFiles,
        sizeLimitExceeded: this.isSizeLimitExceeded(newFiles),
        showPreview: newFiles.length !== 0,
      });
    }
    return;
  };

  removeAll = () => {
    this.setState({
      files: [],
      showPreview: false,
      sizeLimitExceeded: false,
    });
  };

  send = () => {
    this.props.send(this.state.files);
    this.removeAll();
  };

  addPages = () => this.setState({ showPreview: false });

  onFlashModeChange = () => {
    const index = flashModes.indexOf(this.state.flashMode);
    const flashMode = flashModes[index + 1] || flashModes[0];
    this.setState({ flashMode });
    AsyncStorage.setItem(FLASHMODE, flashMode);
  };

  redo = (index?: number) => {
    if (index) {
      this.setState({
        showPreview: false,
        redoing: index,
      });
    }
    return;
  };

  openPreview = () => this.setState({ showPreview: true });

  render() {
    const {
      permissionsGranted,
      files,
      flashMode,
      showPreview,
      shooting,
      sizeLimitExceeded,
    } = this.state;
    const { queues, currentQueueIndex, uploading } = this.props;
    return (
      <View style={{ position: 'relative', width: '100%', height: '100%' }}>
        {permissionsGranted ? (
          showPreview ? (
            <Preview
              files={files}
              remove={this.remove}
              removeAll={this.removeAll}
              send={this.send}
              addPages={this.addPages}
              redo={this.redo}
              multiple={files.length > 1}
              ratio={this.state.ratio}
              sizeLimitExceeded={sizeLimitExceeded}
            />
          ) : (
            <Camera
              shooting={shooting}
              sizeLimitExceeded={sizeLimitExceeded}
              onFlashModeChange={this.onFlashModeChange}
              flashMode={flashMode}
              ratio={this.state.ratio}
              onCameraReady={this.getRatio}
              getRef={this.camera}
              shoot={this.shoot}
              send={this.send}
              pagesCount={files.length}
              lastFile={last(files)}
              openPreview={this.openPreview}
            />
          )
        ) : (
          <NoPermission requestPermission={this.requestPermission} />
        )}
        {uploading && <UploadIndicator />}
        {currentQueueIndex !== null &&
          currentQueueIndex !== undefined &&
          !!queues &&
          !!queues.length && (
            <QueuePicker
              queues={queues}
              currentQueueIndex={currentQueueIndex}
              onQueuePick={this.props.selectQueue}
            />
          )}
        {shooting && <PhotoLoader />}
        {sizeLimitExceeded && (
          <View
            pointerEvents="none"
            style={{
              ...StyleSheet.absoluteFillObject,
              alignItems: 'center',
              padding: 10,
            }}>
            <Message
              show={true}
              text={`You have exceeded the attachments limit size of ${sizeLimitMB} MB. Please, remove one of the photos to be able to send them.`}
            />
          </View>
        )}
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  // TODO my root actions ,todo todo
  send: (...args) => dispatch(uploadDocuments(...args)),
  selectQueue: (...args) => dispatch(selectQueue(...args)),
  fetchQueues: (...args) => dispatch(fetchQueues(...args)),
});

const mapStateToProps = state => ({
  queues: state.queues.queues,
  currentQueueIndex: state.queues.currentQueueIndex,
  uploading: state.documents.uploading,
});

export default connect(mapStateToProps, mapDispatchToProps)(CameraHandler);
