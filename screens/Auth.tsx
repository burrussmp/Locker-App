/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc Authorization Screen
 */

import React, {useState} from 'react';
import {
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {BlurView} from 'expo-blur';

import AuthActions from 'store/actions/auth.actions';
import styles from 'styles/styles';

import backgroundImagePath from 'assets/images/splash.png';
import logoTextImagePath from 'assets/images/logo_text.png';
import logoImagePath from 'assets/images/logo.png';

const AuthScreen = (props: any) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImagePath}
        style={styles.authBackgroundImage}
      >
        <View style={styles.centered}>
          <Image source={logoTextImagePath} style={styles.logoText}></Image>
          <Image source={logoImagePath}></Image>
        </View>
        <View style={styles.authButtonContainer}>
          <View style={[styles.authButton, styles.whiteBackground]}>
            <Text style={styles.authButtonText}>Get Started</Text>
          </View>
          <BlurView tint={'default'} intensity={100} style={styles.authButton}>
            <View style={styles.authButton}>
              <Text style={styles.authButtonBlurredText}>Login</Text>
            </View>
          </BlurView>
        </View>
        <View style={styles.authButtonContainer}>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.authButton, styles.authButtonOverlay]}
            onPress={() => {
              props.navigation.navigate('Register');
            }}
          >
            <Text style={styles.authButtonBlurredText}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.authButton, styles.authButtonBlurredOverlay]}
            onPress={() => {
              props.navigation.navigate('Login');
            }}
          >
            <Text style={styles.authButtonBlurredText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    Login: (token: string) => {
      dispatch(AuthActions.Login(token));
    },
  };
};

export default connect(null, mapDispatchToProps)(AuthScreen);
