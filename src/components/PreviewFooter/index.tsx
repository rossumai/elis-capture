import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

type Props = {
  multiple: boolean;
  removeAll: () => void;
  send: () => void;
  sizeLimitExceeded: boolean;
};

const PreviewFooter = ({ removeAll, multiple, send, sizeLimitExceeded }: Props) => (
  <View
    style={{
      flexDirection: 'row',
      position: 'absolute',
      bottom: 10,
      width: '100%',
      justifyContent: 'space-between',
      flex: 1,
      paddingBottom: 10,
    }}
  >
    <Button
      backgroundColor="transparent"
      onPress={removeAll}
      icon={{ name: multiple ? 'delete-sweep' : 'delete', size: 20 }}
      title={multiple ? 'All' : 'Delete'}
      fontSize={18}
      buttonStyle={{ height: 42 }}
    />
    <Button
      onPress={send}
      disabled={sizeLimitExceeded}
      borderRadius={10}
      backgroundColor="#2f72ff"
      icon={{ name: 'send', size: 20 }}
      title="Send"
      fontSize={18}
      buttonStyle={{ height: 42 }}
      disabledStyle={{ opacity: 0.5, backgroundColor: '#2f72ff' }}
    />
  </View>
);

export default PreviewFooter;
