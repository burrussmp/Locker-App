/**
  * @author Paul H. Sullivan
  * @date Sep 2020
  * @desc Authorization Screen
*/

import React, { useState } from 'react';
import { ImageBackground, Image, Text, TouchableOpacity, View, Alert, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { BlurView } from 'expo-blur';

import AuthActions from 'store/actions/auth.actions';
import AuthButton from 'components/AuthButton.tsx';
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
      <SafeAreaView style={styles.droidSafeArea}>
          <View style={styles.centered}>
            <Image source={logoTextImage} style={styles.logoText}></Image>
            <Image source={logoImage}></Image>
          </View>
          <View style={styles.authButtonContainer}>
            <AuthButton
              text="Get Started"
              onPress={() => {props.navigation.navigate('Register')}}
            />
            <AuthButton
              text="Login"
              mode="blurred"
              onPress={() => {props.navigation.navigate('Login')}}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    "Login": (token: string) => { dispatch(AuthActions.Login(token)) }
  }
};

export default connect(
  null,
  mapDispatchToProps
)(AuthScreen)