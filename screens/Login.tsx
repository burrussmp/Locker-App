/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Login Screen
 */

import React, {useState} from 'react';
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
import AuthActions from 'store/actions/auth.actions';
import AuthButton from 'components/Auth.Button';
import api from 'api/api';
import {Session} from 'store/types/auth.types';
import styles from 'styles/styles';

const logoImage = require('assets/images/logo.png');

const LoginScreen = (props: any) => {
  const [loginInfo, setLoginInfo] = useState('');
  const [password, setPassword] = useState('');
  return (
    <SafeAreaView style={styles.droidSafeArea}>
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
                  api.auth
                    .Login(data)
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
    </SafeAreaView>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    Login: async (session: Session) => {
      dispatch(AuthActions.Login(session));
      if (session) {
        const verified = await api.session.verifyToken(session['access_token']);
        dispatch(AuthActions.VerifyToken(verified));
      }
    },
  };
};

export default connect(null, mapDispatchToProps)(LoginScreen);
