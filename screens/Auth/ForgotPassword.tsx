/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Forgot password screen
 */

import React, {useState} from 'react';
import {
  TextInput,
  Image,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AuthButton from 'components/Auth.Button';
import LinkText from 'components/Auth/LinkText';
import api from 'api/api';
import AuthStyles from 'styles/Auth/Auth.Styles';
import SafeArea from 'components/Common/SafeArea';
import LoadingAll from 'components/Common/LoadingAll';

const logoImage = require('assets/images/logo.png');

const styles = StyleSheet.create({
  promptText: {
    fontSize: 24,
    fontFamily: 'CircularBlack',
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 20,
  },
});

const ForgotPassword = () => {
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
    try {
      const response = await api.Auth.ForgotPassword(email);
      setLoading(false);
      navigation.navigate('ResetPassword', {
        cognito_username: response.cognito_username,
        email: email,
      });
    } catch (err) {
      const error = JSON.parse(err.message);
      setLoading(false);
      return Alert.alert(error.error);
    }
  };

  const LoadingComponent = loading ? <LoadingAll /> : undefined;
  return (
    <SafeArea
      keyboardAvoidView
      children={
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={AuthStyles.TopContainer}>
            <Image source={logoImage} style={AuthStyles.Logo}></Image>
            <View style={AuthStyles.InputContainerMain}>
              <Text style={styles.promptText}>{PromptText}</Text>
              <View style={AuthStyles.TextInputContainer}>
                <TextInput
                  style={AuthStyles.TextInput}
                  placeholder={inputTextPrompt}
                  placeholderTextColor="lightgrey"
                  value={email}
                  onChangeText={setEmail}
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <LinkText
                screen={'Login'}
                styles={{marginTop: 5, marginLeft: 5}}
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
      }
    />
  );
};

export default ForgotPassword;
