/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc Authorization Screen
 */

import React, {Fragment} from 'react';
import {ImageBackground, Image, View, SafeAreaView} from 'react-native';

import AuthButton from 'components/Auth.Button';
import styles from 'styles/styles';

const backgroundImage = require('assets/images/splash.png');
const logoTextImage = require('assets/images/logo_text.png');
const logoImage = require('assets/images/logo.png');

const AuthScreen = (props: any) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        style={styles.authBackgroundImage}
      >
        <View style={styles.centered}>
          <Image source={logoTextImage} style={styles.logoText}></Image>
          <Image source={logoImage}></Image>
        </View>
        <View style={styles.authButtonContainer}>
          <AuthButton
            text="Get Started"
            onPress={() => {
              props.navigation.navigate('Register');
            }}
          />
          <AuthButton
            text="Login"
            mode="blurred"
            onPress={() => {
              props.navigation.navigate('Login');
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default AuthScreen;
