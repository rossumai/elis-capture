import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CapturedPicture } from '../Camera';
import PreviewFooter from '../PreviewFooter';
import PreviewPages from '../PreviewPages';

type Props = {
  files: CapturedPicture[];
  multiple: boolean;
  remove: (i: number) => void;
  removeAll: () => void;
  send: () => void;
  ratio: string;
  addPages: () => void;
  redo: () => void;
  sizeLimitExceeded: boolean;
  addFileFromLibrary: () => Promise<void>;
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
  addFileFromLibrary,
}: Props) => (
  <View style={styles.Preview}>
    <PreviewPages remove={remove} redo={redo} pages={files} addPages={addPages} />
    <PreviewFooter
      multiple={multiple}
      removeAll={removeAll}
      send={send}
      sizeLimitExceeded={sizeLimitExceeded}
      addFileFromLibrary={addFileFromLibrary}
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
