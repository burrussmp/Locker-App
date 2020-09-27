/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Basic Text Input for auth
 */

import React from 'react';
import {TextInput, View} from 'react-native';

import AuthStyles from 'styles/Auth/Auth.Styles';

/**
 * @desc the basic text input for the auth screens
 * @param {string} value the value currently displayed in the text input
 * @param {function} onChangeText the state callback
 * @param {string} placeholder place holder of the input
 * @param {string} textContentType Same as normal text input
 * @param {React.Component} rightIcon : Icon to put on right
 * @param {React.Component} leftIcon : Icon to put on left
 * @param {boolean} secureTextEntry : Whether to hide text
 * @param {object} textStyle : additional styling for the text
 * @param {object} containerStyle : additional styling for the container
 */
const BasicTextInput = (props: any) => {
  const value = props.value;
  const setValue = props.onChangeText;
  const placeHolder = props.placeholder;
  const textContentType = props.textContentType;
  const rightIcon = props.rightIcon;
  const secureTextEntry = props.secureTextEntry;
  const LeftIcon = props.LeftIcon;
  const textStyle = props.textStyle;
  const containerStyle = props.containerStyle;
  if (!setValue || !textContentType) {
    throw 'Missing required props';
  }
  let keyBoardType;
  if (textContentType === 'emailAddress') {
    keyBoardType = 'email-address';
  } else if (textContentType === 'telephoneNumber') {
    keyBoardType = 'phone-pad';
  }
  return (
    <View style={[AuthStyles.TextInputContainer, containerStyle]}>
      {LeftIcon}
      <TextInput
        style={[AuthStyles.TextInput, textStyle]}
        placeholder={placeHolder}
        placeholderTextColor="lightgrey"
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
        textContentType={textContentType}
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        keyboardType={keyBoardType}
        autoCapitalize="none"
      />
      {rightIcon}
    </View>
  );
};

export default BasicTextInput;
