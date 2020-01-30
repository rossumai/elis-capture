import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Props = {
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
  username: string;
  password: string;
};

const Form = ({ onUsernameChange, onPasswordChange, username, password, onSubmit }: Props) => (
  <View style={styles.FormWrapper}>
    <TextInput
      value={username}
      placeholder="E-mail"
      onChangeText={onUsernameChange}
      placeholderTextColor="#979797"
      style={styles.Input}
      underlineColorAndroid="rgba(0,0,0,0)"
    />
    <TextInput
      value={password}
      placeholder="Password"
      onChangeText={onPasswordChange}
      placeholderTextColor="#979797"
      style={styles.Input}
      underlineColorAndroid="rgba(0,0,0,0)"
      secureTextEntry
    />
    <TouchableOpacity onPress={onSubmit} style={styles.Button}>
      <View>
        <Text style={{ color: 'white' }}>Login</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  FormWrapper: {
    flex: 2,
    justifyContent: 'flex-start',
    marginTop: 40,
    alignItems: 'center',
    width: '80%',
  },
  Input: {
    width: '80%',
    margin: 5,
    color: 'white',
    borderBottomColor: '#403e46',
    borderBottomWidth: 1,
  },
  Button: {
    width: '30%',
    height: 40,
    backgroundColor: '#2f72ff',
    borderRadius: 10,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Form;
