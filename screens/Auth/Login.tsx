/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Login Screen
 */

import {
  Image,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Alert,
  ImageSourcePropType,
} from 'react-native';
import React, { useState, FC } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { Session } from 'store/types/auth.types';
import styles from 'styles/styles';
import AuthButton from 'components/Auth.Button';
import Loading from 'components/Common/LoadingAll';
import AuthTextInput from 'screens/Auth/components/BasicTextInput';
import LinkText from 'screens/Auth/components/LinkText';
import SafeArea from 'components/Common/SafeArea';
import AuthSelectors from 'store/selectors/auth.selectors';
import api, { APIErrorType } from 'api/api';
import AuthStyles from 'styles/Auth/Auth.Styles';
import config from 'config';

import logoImage from 'assets/images/logo.png';

import { RootAction } from 'store/index';

const DefaultUser = config.defaultUser;

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  Login: async (session: Session) => {
    await AuthSelectors.authenticate(dispatch, session);
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type IProps = PropsFromRedux;

const LoginScreen: FC<IProps> = ({ Login }: IProps) => {
  // state
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    api.Auth.Login(login, password)
      .then(async (session: Session) => {
        await Login(session);
        setLoading(false);
      })
      .catch((err: APIErrorType) => {
        setLoading(false);
        Alert.alert(err.error);
      });
  };

  const handleAutoFill = () => {
    setLoading(true);
    api.Auth.Login(DefaultUser.login, DefaultUser.password)
      .then(async (session: Session) => {
        await Login(session);
        setLoading(false);
      })
      .catch((err: APIErrorType) => {
        setLoading(false);
        Alert.alert(err.error);
      });
  };

  const ForgotPasswordText = 'Forgot Password?';
  const RegisterText = 'Create a new account';
  const placeHolderLogin = 'Username, Email, or Phone Number';
  const placeHolderPassword = 'Enter password';

  const LoadingComponent = loading ? <Loading /> : undefined;
  return (
    <SafeArea keyboardAvoidView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={AuthStyles.TopContainer}>
          <Image source={logoImage as ImageSourcePropType} style={AuthStyles.Logo} />
          <View style={AuthStyles.InputContainerMain}>
            <AuthTextInput
              placeHolder={placeHolderLogin}
              value={login}
              setValue={setLogin}
              textContentType="emailAddress"
            />
            <AuthTextInput
              placeHolder={placeHolderPassword}
              value={password}
              setValue={setPassword}
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
    </SafeArea>
  );
};

export default connector(LoginScreen) as FC<IProps>;
