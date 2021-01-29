/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc Authorization Screen
 */

import React, { Fragment } from 'react';
import {
  ImageBackground, Image, View, SafeAreaView, Alert, Text,
  ImageSourcePropType,
} from 'react-native';
import SafeArea from 'components/Common/SafeArea';
import AuthButton from 'components/Auth.Button';
import styles from 'styles/styles';

import backgroundImage from 'assets/images/splash.png';
import logoTextImage from 'assets/images/logo_text.png';
import logoImage from 'assets/images/logo.png';

const AuthScreen = (props: any) => (
  <SafeArea>
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage as ImageSourcePropType}
        style={styles.authBackgroundImage}
      >
        <View style={styles.centered}>
          <Image source={logoTextImage as ImageSourcePropType} style={styles.logoText} />
          <Image source={logoImage as ImageSourcePropType} />
        </View>
        <View style={styles.AuthButtonContainer}>
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
  </SafeArea>
);

export default AuthScreen;
