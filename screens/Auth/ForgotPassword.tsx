/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Forgot password screen
 */

import React, { useState, FC } from 'react';
import {
  Image,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  StyleSheet,
  Alert,
  ImageSourcePropType,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthButton from 'components/Auth.Button';
import AuthTextInput from 'components/Auth/BasicTextInput';
import LinkText from 'components/Auth/LinkText';
import api, { APIErrorType } from 'api/api';
import AuthStyles from 'styles/Auth/Auth.Styles';
import SafeArea from 'components/Common/SafeArea';
import LoadingAll from 'components/Common/LoadingAll';

import { ForgotPasswordProp } from 'types/Navigation/auth.navigation.types';

import logoImage from 'assets/images/logo.png';

const styles = StyleSheet.create({
  promptText: {
    fontSize: 24,
    fontFamily: 'CircularBlack',
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 20,
  },
});

type IProps = ForgotPasswordProp;

const ForgotPassword: FC<IProps> = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const PromptText = 'Reset Password';
  const ButtonText = 'Send Confirmation Code';
  const BackToLoginText = 'Back to Login';
  const inputTextPrompt = 'Enter email';

  const handleSubmit = async () => {
    Keyboard.dismiss();
    if (!email) {
      return Alert.alert('Please enter your email');
    }
    setLoading(true);
    return api.Auth.ForgotPassword(email).then((res) => {
      setLoading(false);
      navigation.navigate('ResetPassword', {
        cognito_username: res.cognito_username,
        email,
      });
    }).catch((err: APIErrorType) => {
      setLoading(false);
      return Alert.alert(err.error);
    });
  };

  const LoadingComponent = loading ? <LoadingAll /> : undefined;
  return (
    <SafeArea keyboardAvoidView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={AuthStyles.TopContainer}>
          <Image source={logoImage as ImageSourcePropType} style={AuthStyles.Logo} />
          <View style={AuthStyles.InputContainerMain}>
            <Text style={styles.promptText}>{PromptText}</Text>
            <AuthTextInput
              placeholder={inputTextPrompt}
              value={email}
              onChangeText={setEmail}
              textContentType="emailAddress"
            />
            <LinkText
              screen="Login"
              style={{ marginLeft: 5 }}
              placeHolder={BackToLoginText}
            />
          </View>
          <View style={AuthStyles.AuthButtonContainer}>
            <AuthButton
              text={ButtonText}
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

export default ForgotPassword;
