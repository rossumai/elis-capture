/* @flow */
import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import PreviewFooter from '../PreviewFooter';
import PreviewPages from '../PreviewPages';

type Props = {
  files: Array<Object>,
  multiple: boolean,
  remove: Function,
  removeAll: Function,
  send: Function,
  addPages: Function,
  redo: Function,
}

const Preview = ({
  send,
  remove,
  files,
  multiple,
  removeAll,
  addPages,
  redo,
}: Props) => (
  <View style={styles.Preview}>
    <PreviewPages
      remove={remove}
      redo={redo}
      pages={files}
      addPages={addPages}
    />
    <PreviewFooter
      multiple={multiple}
      removeAll={removeAll}
      send={send}
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
