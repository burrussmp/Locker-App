/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Login Screen
 */

import React, {useState, useEffect} from 'react';
import {SafeAreaView, TextInput, Text, TouchableOpacity, Image, View} from 'react-native';
import {connect} from 'react-redux';

import AuthActions from 'store/actions/auth.actions';
import api from 'api/api';
import styles from 'styles/styles';

import logoImage from 'assets/images/logo.png';

import {KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Button, Keyboard  } from 'react-native';


const LoginScreen = (props: any) => {
  const [loginInfo, setLoginInfo] = useState('');
  const [password, setPassword] = useState('');
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
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
        <View
          style={[
            styles.authButton,
            styles.blackBackground,
          ]}
        >
          <Text style={styles.authButtonBlurredText}>Login</Text>
        </View>
      </View>
      <View style={styles.authButtonContainer}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.authButton, styles.authButtonBlackOverlay]}
          onPress={() => {
            const data = {
              login: loginInfo,
              password: password,
            };
            api
              .Login(data)
              .then(token => {
                props.Login(token);
              })
              .catch(err => {
                console.log(err);
              });
          }}
        >
          <Text style={styles.authButtonBlurredText}>Login</Text>
        </TouchableOpacity>
      </View>
      </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    Login: (token: string) => {
      dispatch(AuthActions.Login(token));
    },
  };
};

export default connect(null, mapDispatchToProps)(LoginScreen);
