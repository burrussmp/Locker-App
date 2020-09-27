/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Login Screen
 */

import React, {useState} from 'react';
import {
  Image,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Text,
  ScrollView,
} from 'react-native';

import PasswordInput from 'containers/Auth/PasswordInput';
import ConfirmationCodeTextInput from 'components/Auth/ConfirmationCodeTextInput';
import AuthButton from 'components/Auth.Button';
import SafeArea from 'components/Common/SafeArea';
import LoadingAll from 'components/Common/LoadingAll';
import LinkText from 'components/Auth/LinkText';

import {useNavigation} from '@react-navigation/native';
import api from 'api/api';
import AuthStyles from 'styles/Auth/Auth.Styles';

const logoImage = require('assets/images/logo.png');

const ResetPassword = (props: any) => {
  // extract props
  const cognito_username = props.route.params.cognito_username;
  const email = props.route.params.email;
  if (!cognito_username || !email) {
    throw 'Error: Cognito username and email not found. Must navigate from "Reset Password" Screen';
  }
  // state
  const [confirmationCode, setConfirmationCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmed, confirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const BackToLoginText = 'Back to login';

  const handleSubmit = async () => {
    if (!confirmationCode || confirmationCode.length !== 6) {
      return Alert.alert('Please enter the confirmation code');
    }
    if (!passwordConfirmed) {
      return Alert.alert('Please enter and confirm a new password');
    }
    try {
      setLoading(true);
      await api.Auth.ConfirmForgotPassword(
        cognito_username,
        confirmationCode,
        password
      );
      Alert.alert('Password successfully reset!');
      navigation.navigate('Login', {login: email});
    } catch (err) {
      setLoading(false);
      const error = JSON.parse(err.message);
      Alert.alert(error.error);
    }
  };

  const confirmationCodePrompt =
    'Please enter the confirmation code emailed to you below';
  const submitButtonText = 'Change Password';
  const LoadingComponent = loading ? <LoadingAll /> : undefined;
  return (
    <SafeArea
      keyboardAvoidView
      children={
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={AuthStyles.TopContainer}>
            <Image source={logoImage} style={AuthStyles.Logo}></Image>
            <View style={AuthStyles.InputContainerMain}>
              <ConfirmationCodeTextInput
                onChangeText={setConfirmationCode}
                prompt={confirmationCodePrompt}
                cell_count={6}
                email={email}
                promptSendNewCode
              />
              <PasswordInput
                labelPassword={'New password:'}
                labelConfirmPassword={'Confirm new password:'}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
              />
              <LinkText
                screen={'Login'}
                style={{marginLeft: 5}}
                placeHolder={BackToLoginText}
              />
            </View>
            <View style={AuthStyles.AuthButtonContainer}>
              <AuthButton
                text={submitButtonText}
                mode="dark"
                onPress={handleSubmit}
              />
            </View>
            {LoadingComponent}
          </View>
        </TouchableWithoutFeedback>
      }
    ></SafeArea>
  );
};

export default ResetPassword;
