import api from 'api/api';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Confirmation code text input
 */

import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';

import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: 250,
    marginBottom: 30,
  },
  promptText: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#555',
    fontFamily: 'CircularBlack',
    fontSize: 17,
  },
  inputBox: {
    width: 30,
    height: 30,
    lineHeight: 30,
    fontSize: 24,
    borderWidth: 2,
    borderColor: 'tan',
    textAlign: 'center',
  },
  inputBoxFocused: {
    borderColor: '#555',
  },
  sendNewCodeText: {
    paddingTop: 10,
    color: '#12cccc',
    fontFamily: 'CircularBlack',
    fontSize: 13,
    textAlign: 'left',
  },
});

/**
 * @desc A text input to enter a confirmation
 * @param {number} cell_count The number of input cells
 * @param {string} prompt Text to display above the input fields
 * @param {function} onChangeText A handler to do something when the text changes
 * @param {string} email This is necesssary in case they need to resubmit the code
 */
const ConfirmationCodeTextInput = (props: any) => {
  // extract props
  const cell_count = props.cell_count;
  const prompt = props.prompt;
  const onChangeText = props.onChangeText;
  const email = props.email;
  // set state
  const [value, setValue] = useState('');
  const [cellProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  // const prompt = ;

  /**
   * @desc A wrapper around the onChange prop if passed that was provided
   * by the parent
   * @param text The current code
   */
  const wrapperChangeText = (text: string) => {
    setValue(text);
    if (onChangeText) {
      onChangeText(text);
    }
  };
  const promptToResubmit = "Can't get the code?";
  const sendNewCode = props.promptSendNewCode ? (
    <TouchableOpacity
      onPress={() => {
        Alert.alert(
          `Resend confirmation code to ${email}?`,
          '',
          [
            {
              text: 'Resend',
              onPress: async () => {
                try {
                  await api.Auth.ForgotPassword(email);
                  Alert.alert(`Resent confirmation code to ${email}`);
                } catch (err) {
                  const error = JSON.parse(err.message);
                  Alert.alert(error.error);
                }
              },
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
          {cancelable: true}
        );
      }}
    >
      <Text style={styles.sendNewCodeText}>{promptToResubmit}</Text>
    </TouchableOpacity>
  ) : undefined;

  return (
    <View style={styles.container}>
      <Text style={styles.promptText}>{prompt}</Text>
      <CodeField
        {...cellProps}
        value={value}
        onChangeText={wrapperChangeText}
        cellCount={cell_count}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.inputBox, isFocused && styles.inputBoxFocused]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      {sendNewCode}
    </View>
  );
};

export default ConfirmationCodeTextInput;
