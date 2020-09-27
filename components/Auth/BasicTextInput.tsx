/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Basic Text Input for auth
 */

import React, {useState} from 'react';
import {
  TextInput,
  Image,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Text,
  TouchableOpacity,
} from 'react-native';

import AuthStyles from 'styles/Auth/Auth.Styles';

/**
 * @desc the basic text input for the auth screens
 * @param {string} value the value currently displayed in the text input
 * @param {function} onChangeText the state callback
 * @param {string} placeholder place holder of the input
 * @param {string} textContentType Same as normal text input
 */
const BasicTextInput = (props: any) => {
  const value = props.value;
  const setValue = props.onChangeText;
  const placeHolder = props.placeholder;
  const textContentType = props.textContentType;
  if (!setValue || !textContentType) {
    throw 'Missing required props';
  }
  let keyBoardType;
  if (textContentType === 'email') {
    keyBoardType = 'email-address';
  } else if (textContentType === 'telephoneNumber') {
    keyBoardType = 'phone-pad';
  }
  return (
    <View style={AuthStyles.TextInputContainer}>
      <TextInput
        style={AuthStyles.TextInput}
        placeholder={placeHolder}
        placeholderTextColor="lightgrey"
        value={value}
        onChangeText={setValue}
        secureTextEntry={textContentType === 'password'}
        textContentType={textContentType}
        keyboardType={keyBoardType}
        autoCapitalize="none"
      />
    </View>
  );
};

export default BasicTextInput;
