/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import type { Message as Props } from '../../redux/modules/messages/reducer';


const Message = ({ show, text }: Props) => show && (
  <View style={{
    width: '100%',
    height: '50%',
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
  }}
  >
    <View style={{
      zIndex: 10,
      padding: 10,
      borderRadius: 5,
      backgroundColor: 'black',
      opacity: 0.9,
    }}
    >
      <Text style={{ color: 'white' }}>
        {text}
      </Text>
    </View>
  </View>

);

const mapStateToProps = state => state.messages;

export default connect(mapStateToProps)(Message);
