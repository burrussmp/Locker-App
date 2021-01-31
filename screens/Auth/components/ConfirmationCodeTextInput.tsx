/* eslint-disable react/jsx-props-no-spreading */
/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Confirmation code text input
 */

import React, { FC } from 'react';
import api, { APIErrorType } from 'api/api';

import {
  View, Text, StyleSheet, TouchableOpacity, Alert,
} from 'react-native';

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

type IProps = {
  value: string;
  setValue: (text: string) => void;
  cellCount: number;
  prompt: string;
  email: string;
};

const ConfirmationCodeTextInput: FC<IProps> = ({
  cellCount, prompt, value, setValue, email,
}: IProps) => {
  // set state
  const [cellProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const helpText = "Can't get the code?";
  return (
    <View style={styles.container}>
      <Text style={styles.promptText}>{prompt}</Text>
      <CodeField
        {...cellProps}
        value={value}
        onChangeText={setValue}
        cellCount={cellCount}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.inputBox, isFocused && styles.inputBoxFocused]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            `Resend confirmation code to ${email}?`,
            '',
            [
              {
                text: 'Resend',
                onPress: () => {
                  api.Auth.ForgotPassword(email).then(() => {
                    Alert.alert(`Resent confirmation code to ${email}`);
                  }).catch((err: APIErrorType) => {
                    Alert.alert(err.error);
                  });
                },
              },
              {
                text: 'Cancel',
                style: 'cancel',
              },
            ],
            { cancelable: true },
          );
        }}
      >
        <Text style={styles.sendNewCodeText}>{helpText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmationCodeTextInput;
