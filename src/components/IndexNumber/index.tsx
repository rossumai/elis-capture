import React from 'react';
import { Text, View } from 'react-native';

type Props = {
  value: number;
  style?: {};
  textStyle?: {};
};

const IndexNumber = ({ value, style, textStyle }: Props) => (
  <View
    style={{
      backgroundColor: '#2f72ff',
      width: 30,
      height: 30,
      borderRadius: 40,
      ...style,
    }}>
    <Text
      style={{
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        ...textStyle,
      }}>
      {value}
    </Text>
  </View>
);

IndexNumber.defaultProps = {
  style: {},
  textStyle: {},
};

export default IndexNumber;
