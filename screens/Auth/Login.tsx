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
  Button,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {Session} from 'store/types/auth.types';
import styles from 'styles/styles';
import AuthButton from 'components/Auth.Button';
import AuthSelectors from 'store/selectors/auth.selectors';
import api from 'api/api';
import LoginStyles from 'components/Auth/Login.Styles';
import config from 'config';

const DefaultUser = config.default_user;

const logoImage = require('assets/images/logo.png');

// authTextInput: {
//   position: 'relative',
//   margin: -0.5,
//   height: 35,
//   width: '90%',
//   paddingLeft: 10,
//   paddingRight: 10,
//   alignItems: 'center',
//   justifyContent: 'center',
//   backgroundColor: '#FFF',
//   borderWidth: 1,
//   borderColor: '#DDD',
//   color: '#000',
// },

const LoginScreen = (props: any) => {
  const [loginInfo, setLoginInfo] = useState(
    props.route.params && props.route.params.login
  );
  const [password, setPassword] = useState('');
  const ComponentStyles = LoginStyles;
  const navigation = useNavigation();
  const ForgotPasswordText = 'Forgot Password?';
  return (
    <Fragment>
      <SafeAreaView style={styles.safeArea} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -100 : 20}
        enabled={Platform.OS === 'ios' ? true : false}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={ComponentStyles.TopContainer}>
            <Image source={logoImage} style={ComponentStyles.logo}></Image>
            <View style={ComponentStyles.TextInputContainer}>
              <TextInput
                style={ComponentStyles.TextInput}
                placeholder="Username, Email, or Phone Number"
                placeholderTextColor="lightgrey"
                value={loginInfo}
                onChangeText={setLoginInfo}
                textContentType="username"
                autoCapitalize="none"
              />
              <TextInput
                style={ComponentStyles.TextInput}
                placeholder="Password"
                placeholderTextColor="lightgrey"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                textContentType="password"
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ForgotPassword');
                }}
              >
                <Text style={ComponentStyles.TextLink}>
                  {ForgotPasswordText}
                </Text>
              </TouchableOpacity>
            </View>
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
              <Button
                title="AutoLogin"
                onPress={() => {
                  api.Auth.Login(DefaultUser)
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
