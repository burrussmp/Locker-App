/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc A container for submitting a new password
 */

import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Validators from 'services/Validators';
import PasswordTextInput from 'components/Auth/PasswordTextInput';

/**
 * @desc A contaner to abstract the password containers
 * @param {function} confirmPassword A function that accepts a single parameter
 * that is true when password is confirmed else false
 * @param {function} setPassword A function that accepts the current password
 */
const PasswordInput = (props: any) => {
  const confirmPassword = props.confirmPassword;
  const setPassword = props.setPassword;

  const [newPassword, setNewPassword] = useState('');

  const validationNewPassword = (text: string) => {
    confirmPassword(false);
    setNewPassword(text);
    setPassword(text);
    const errorMessage = Validators.isValidPassword(text);
    if (!text) {
      return {valid: false, message: 'Please enter a new password'};
    } else if (errorMessage) {
      return {valid: false, message: errorMessage};
    } else {
      return {valid: true, message: 'Valid password'};
    }
  };

  const validationConfirmPassword = (text: string) => {
    confirmPassword(false);
    const errorMessage = Validators.isValidPassword(newPassword);
    if (text && errorMessage) {
      return {valid: false, message: ''};
    } else if (text && text !== newPassword) {
      return {valid: false, message: 'Password does not match'};
    } else if (text === newPassword && !errorMessage) {
      confirmPassword(true);
      return {valid: true, message: 'Passwords match'};
    } else {
      return {valid: false, message: ''};
    }
  };

  return (
    <>
      <PasswordTextInput
        placeHolder={'New password'}
        toggleVisibility={true}
        validator={validationNewPassword}
      />
      <PasswordTextInput
        placeHolder={'Confirm password'}
        watch={newPassword}
        validator={validationConfirmPassword}
      />
    </>
  );
};

export default PasswordInput;
