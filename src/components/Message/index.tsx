import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { reduxStateT } from '../../common/configureStore';
import { Message as Props } from '../../common/modules/messages/reducer';

export const Message = ({ show, text }: Props) =>
  show ? (
    <View
      style={{
        width: '100%',
        height: '50%',
        position: 'absolute',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
      }}>
      <View
        style={{
          zIndex: 10,
          padding: 10,
          borderRadius: 5,
          backgroundColor: 'black',
          opacity: 0.9,
        }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>{text}</Text>
      </View>
    </View>
  ) : null;

const mapStateToProps = (state: reduxStateT) => state.messages;

export default connect(mapStateToProps)(Message);
