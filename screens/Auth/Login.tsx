/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Login Screen
 */

import React, { useState } from 'react';
import {
  Image,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { Session } from 'store/types/auth.types';
import styles from 'styles/styles';
import AuthButton from 'components/Auth.Button';
import AuthTextInput from 'components/Auth/BasicTextInput';
import Loading from 'components/Common/LoadingAll';
import LinkText from 'components/Auth/LinkText';
import SafeArea from 'components/Common/SafeArea';
import AuthSelectors from 'store/selectors/auth.selectors';
import api from 'api/api';
import AuthStyles from 'styles/Auth/Auth.Styles';
import config from 'config';

import logoImage from 'assets/images/logo.png';

const DefaultUser = config.default_user;

const LoginScreen = (props: any) => {
  // state
  const [loginInfo, setLoginInfo] = useState(
    props.route.params && props.route.params.login,
  );
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  /**
   * @desc Log the user in or alert them of an error
   */
  const handleSubmit = () => {
    const data = {
      login: loginInfo,
      password,
    };
    setLoading(true);
    api.Auth.Login(data)
      .then((session) => {
        props.Login(session);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        const error = JSON.parse(err.message);
        Alert.alert(error.error);
      });
  };

  /**
   * @desc purely for dev purposes to save time
   */
  const handleAutoFill = () => {
    setLoading(true);
    api.Auth.Login(DefaultUser)
      .then((session) => {
        props.Login(session);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const ForgotPasswordText = 'Forgot Password?';
  const RegisterText = 'Create a new account';
  const placeHolderLogin = 'Username, Email, or Phone Number';
  const placeHolderPassword = 'Enter password';

  const LoadingComponent = loading ? <Loading /> : undefined;
  return (
    <SafeArea
      keyboardAvoidView
      children={(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={AuthStyles.TopContainer}>
            <Image source={logoImage} style={AuthStyles.Logo} />
            <View style={AuthStyles.InputContainerMain}>
              <AuthTextInput
                placeholder={placeHolderLogin}
                value={loginInfo}
                onChangeText={setLoginInfo}
                textContentType="emailAddress"
              />
              <AuthTextInput
                placeholder={placeHolderPassword}
                value={password}
                onChangeText={setPassword}
                textContentType="password"
                secureTextEntry
              />
              <View style={AuthStyles.RowContainer}>
                <LinkText
                  screen="ForgotPassword"
                  style={{ marginLeft: 5, marginTop: 5 }}
                  placeHolder={ForgotPasswordText}
                />
                <LinkText
                  screen="Register"
                  style={{ marginRight: 5, marginTop: 5 }}
                  placeHolder={RegisterText}
                />
              </View>
            </View>
            <View style={styles.AuthButtonContainer}>
              <AuthButton text="Login" mode="dark" onPress={handleSubmit} />
              <Button title="AutoLogin" onPress={handleAutoFill} />
            </View>
            {LoadingComponent}
          </View>
        </TouchableWithoutFeedback>
      )}
    />
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  Login: async (session: Session) => {
    await AuthSelectors.authenticate(dispatch, session);
  },
});

export default connect(null, mapDispatchToProps)(LoginScreen);
