/**
 * @author Matthew P. Burruss
 * @date 1/21/2021
 * @desc Login Screen
 */

import React, { useState, FC } from 'react';
import {
  Image,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ImageSourcePropType,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import PasswordInput from 'screens/Auth/containers/PasswordInput';
import ConfirmationCodeTextInput from 'screens/Auth/components/ConfirmationCodeTextInput';
import AuthButton from 'screens/Auth/components/Basic.Button';
import SafeArea from 'common/components/SafeArea';
import LoadingAll from 'common/components/LoadingAll';
import LinkText from 'screens/Auth/components/LinkText';

import api, { APIErrorType } from 'api/api';
import AuthStyles from 'styles/Auth/Auth.Styles';

import { ResetPasswordProp } from 'types/Navigation/auth.navigation.types';

import logoImage from 'assets/images/logo.png';

type IProps = ResetPasswordProp;

const ResetPassword: FC<IProps> = ({ route }: IProps) => {
  // extract props
  const [confirmationCode, setConfirmationCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmed, confirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const BackToLoginText = 'Back to login';

  const handleSubmit = () => {
    if (!confirmationCode || confirmationCode.length !== 6) {
      return Alert.alert('Please enter the confirmation code');
    }
    if (!passwordConfirmed) {
      return Alert.alert('Please enter and confirm a new password');
    }
    setLoading(true);
    return api.Auth.ConfirmForgotPassword(
      route.params.cognito_username,
      confirmationCode,
      password,
    ).then(() => {
      Alert.alert('Password successfully reset!');
      navigation.navigate('Login', { login: route.params.email });
    }).catch((err: APIErrorType) => {
      setLoading(false);
      Alert.alert(err.error);
    });
  };

  const confirmationCodePrompt = 'Please enter the confirmation code emailed to you below';
  const submitButtonText = 'Change Password';
  const LoadingComponent = loading ? <LoadingAll /> : undefined;
  return (
    <SafeArea keyboardAvoidView>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={AuthStyles.TopContainer}>
          <Image source={logoImage as ImageSourcePropType} style={AuthStyles.Logo} />
          <View style={AuthStyles.InputContainerMain}>
            <ConfirmationCodeTextInput
              value={confirmationCode}
              setValue={setConfirmationCode}
              prompt={confirmationCodePrompt}
              cellCount={6}
              email={route.params.email}
            />
            <PasswordInput
              labelPassword="New password:"
              labelConfirmPassword="Confirm new password:"
              setPassword={setPassword}
              confirmPassword={confirmPassword}
            />
            <LinkText
              screen="Login"
              style={{ marginLeft: 5 }}
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
    </SafeArea>
  );
};

export default ResetPassword;
