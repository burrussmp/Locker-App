/**
 * @author Matthew P. Burruss
 * @date 1/30/2021
 * @desc A container for submitting a new password
 */

import React, { useState, FC } from 'react';
import { Text, View } from 'react-native';
import Validators from 'services/validators';
import PasswordTextInput from 'screens/Auth/components/PasswordTextInput';
import AuthStyles from 'styles/Auth/Auth.Styles';
import Icon from 'react-native-vector-icons/Ionicons';

type IProps = {
  labelPassword: string;
  labelConfirmPassword: string;
  confirmPassword: (isConfirmed: boolean) => void;
  setPassword: (password: string) => void;
};

const PasswordInput: FC<IProps> = ({
  labelPassword, labelConfirmPassword, confirmPassword, setPassword,
}: IProps) => {
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
    setValidationConfirm({ valid: false, message: '' });
    const errorMessage = Validators.isValidPassword(text);
    if (!text) {
      setValidationPassword({
        valid: false,
        message: 'Please enter a new password',
      });
    } else if (errorMessage) {
      setValidationPassword({ valid: false, message: errorMessage });
    } else {
      setValidationPassword({ valid: true, message: 'Valid password' });
      if (text === confirmedPassword) {
        setValidationConfirm({ valid: true, message: 'Passwords match' });
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
      setValidationConfirm({ valid: true, message: 'Passwords match' });
    } else if (text !== newPassword && !errorMessage) {
      setValidationConfirm({ valid: false, message: 'Please confirm password' });
    } else {
      setValidationConfirm({
        valid: false,
        message: 'Enter valid password above',
      });
    }
  };

  const ValidationStatusCreator = (
    password: string,
    validationResult: {valid: boolean; message: string},
  ) => {
    const ValidationIcon = password && validationResult.valid ? (
      <Icon name="ios-checkmark" size={17} color="green" />
    ) : undefined;
    const ValidationTextColorStyle = { ...AuthStyles.Label, color: validationResult.valid ? 'green' : 'red' };
    return (
      <View style={AuthStyles.ValidationStatusContainer}>
        <Text style={[ValidationTextColorStyle, { paddingRight: 5 }]}>
          {validationResult.message}
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
        placeHolder="New password"
        toggleVisibility
        value={newPassword}
        setValue={validationNewPassword}
      />
      <View style={AuthStyles.RowContainer}>
        <Text style={AuthStyles.Label}>{labelConfirmPassword}</Text>
        {ValidationStatusCreator(confirmedPassword, validationConfirm)}
      </View>
      <PasswordTextInput
        placeHolder="Confirm password"
        value={confirmedPassword}
        toggleVisibility
        setValue={validationConfirmPassword}
      />
    </>
  );
};

export default PasswordInput;
