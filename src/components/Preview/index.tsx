import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CapturedPicture } from '../Camera';
import PreviewFooter from '../PreviewFooter';
import PreviewPages from '../PreviewPages';

type Props = {
  files: Array<CapturedPicture>;
  multiple: boolean;
  remove: () => void;
  removeAll: () => void;
  send: () => void;
  addPages: () => void;
  redo: () => void;
  sizeLimitExceeded: boolean;
};

const Preview = ({
  send,
  remove,
  files,
  multiple,
  removeAll,
  addPages,
  redo,
  sizeLimitExceeded,
}: Props) => (
  <View style={styles.Preview}>
    <PreviewPages remove={remove} redo={redo} pages={files} addPages={addPages} />
    <PreviewFooter
      multiple={multiple}
      removeAll={removeAll}
      send={send}
      sizeLimitExceeded={sizeLimitExceeded}
    />
  </View>
);

const styles = StyleSheet.create({
  Preview: {
    flex: 1,
    backgroundColor: '#1b1922',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default Preview;
