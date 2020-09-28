/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Login Screen
 */

import React, {useState, Fragment} from 'react';
import {
  SafeAreaView,
  TextInput,
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {connect} from 'react-redux';
import {Session} from 'store/types/auth.types';
import styles from 'styles/styles';
import AuthButton from 'components/Auth.Button';
import AuthSelectors from 'store/selectors/auth.selectors';
import api from 'api/api';

const logoImage = require('assets/images/logo.png');

const LoginScreen = (props: any) => {
  const [loginInfo, setLoginInfo] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Fragment>
      <SafeAreaView style={styles.safeAreaAuth} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -100 : 20}
        enabled={Platform.OS === 'ios' ? true : false}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.topCentered}>
            <Image source={logoImage} style={styles.authLogo}></Image>
            <TextInput
              style={styles.authTextInput}
              placeholder="Username, Email, or Phone Number"
              placeholderTextColor="lightgrey"
              value={loginInfo}
              onChangeText={setLoginInfo}
              textContentType="username"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.authTextInput}
              placeholder="Password"
              placeholderTextColor="lightgrey"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              textContentType="password"
            />
            <View style={styles.authButtonContainer}>
              <AuthButton
                text="Login"
                mode="dark"
                onPress={() => {
                  const data = {
                    login: loginInfo,
                    password: password,
                  };
                  api.Auth.Login(data)
                    .then(session => {
                      props.Login(session);
                    })
                    .catch(err => {
                      console.log(err);
                    });
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    Login: async (session: Session) => {
      await AuthSelectors.Authenticate(dispatch, session);
    },
  };
};

export default connect(null, mapDispatchToProps)(LoginScreen);
