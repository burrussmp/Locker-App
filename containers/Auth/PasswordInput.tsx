/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc A container for submitting a new password
 */

import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Validators from 'services/Validators';
import PasswordTextInput from 'components/Auth/PasswordTextInput';
import AuthStyles from 'styles/Auth/Auth.Styles';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * @desc A container to abstract the password containers
 * @param {function} confirmPassword A function that accepts a single parameter
 * that is true when password is confirmed else false
 * @param {function} setPassword A function that accepts the current password
 */
const PasswordInput = (props: any) => {
  const labelPassword = props.labelPassword;
  const labelConfirmPassword = props.labelConfirmPassword;

  // get parent state
  const confirmPassword = props.confirmPassword;
  const setPassword = props.setPassword;

  // for child state
  const [newPassword, setNewPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const [validationPassword, setValidationPassword] = useState({
    valid: false,
    message: '',
  });

  const [validationConfirm, setValidationConfirm] = useState({
    valid: false,
    message: '',
  });

  const validationNewPassword = (text: string) => {
    confirmPassword(false);
    setNewPassword(text);
    setPassword(text);
    setValidationConfirm({valid: false, message: ''});
    const errorMessage = Validators.isValidPassword(text);
    if (!text) {
      setValidationPassword({
        valid: false,
        message: 'Please enter a new password',
      });
    } else if (errorMessage) {
      setValidationPassword({valid: false, message: errorMessage});
    } else {
      setValidationPassword({valid: true, message: 'Valid password'});
      if (text === confirmedPassword) {
        setValidationConfirm({valid: true, message: 'Passwords match'});
      } else if (confirmedPassword) {
        setValidationConfirm({
          valid: false,
          message: 'Please confirm password',
        });
      }
    }
  };
  const validationConfirmPassword = (text: string) => {
    confirmPassword(false);
    setConfirmedPassword(text);
    const errorMessage = Validators.isValidPassword(newPassword);
    if (text === newPassword && !errorMessage) {
      confirmPassword(true);
      setValidationConfirm({valid: true, message: 'Passwords match'});
    } else if (text !== newPassword && !errorMessage) {
      setValidationConfirm({valid: false, message: 'Please confirm password'});
    } else {
      setValidationConfirm({
        valid: false,
        message: 'Enter valid password above',
      });
    }
  };

  const ValidationStatusCreator = (
    password: string,
    validation_result: {valid: boolean; message: string}
  ) => {
    const ValidationIcon =
      password && validation_result.valid ? (
        <Icon name={'ios-checkmark'} size={17} color={'green'} />
      ) : undefined;
    const ValidationTextColorStyle = Object.assign({}, AuthStyles.Label, {
      color: validation_result.valid ? 'green' : 'red',
    });
    return (
      <View style={AuthStyles.ValidationStatusContainer}>
        <Text style={[ValidationTextColorStyle, {paddingRight: 5}]}>
          {validation_result.message}
        </Text>
        {ValidationIcon}
      </View>
    );
  };

  return (
    <>
      <View style={AuthStyles.RowContainer}>
        <Text style={AuthStyles.Label}>{labelPassword}</Text>
        {ValidationStatusCreator(newPassword, validationPassword)}
      </View>
      <PasswordTextInput
        placeHolder={'New password'}
        toggleVisibility={true}
        value={newPassword}
        onChangeText={validationNewPassword}
      />
      <View style={AuthStyles.RowContainer}>
        <Text style={AuthStyles.Label}>{labelConfirmPassword}</Text>
        {ValidationStatusCreator(confirmedPassword, validationConfirm)}
      </View>
      <PasswordTextInput
        placeHolder={'Confirm password'}
        value={confirmedPassword}
        onChangeText={validationConfirmPassword}
        hideValidation={false}
      />
    </>
  );
};

export default PasswordInput;
