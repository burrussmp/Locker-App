/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc Authorization Screen
 */

import React, {useState} from 'react';
import {
  ImageBackground,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {BlurView} from 'expo-blur';
import { useFonts } from 'expo-font';

import AuthActions from 'store/actions/auth.actions';
import styles from 'styles/styles';

import backgroundImage from 'assets/images/splash.png';
import logoTextImage from 'assets/images/logo_text.png';
import logoImage from 'assets/images/logo.png';

const AuthScreen = (props: any) => {
  useFonts({
    'CircularStd': require('../assets/fonts/CircularStd-Black.otf'),
  });
  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        style={styles.authBackgroundImage}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.centered}>
            <Image source={logoTextImage} style={styles.logoText}></Image>
            <Image source={logoImage}></Image>
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
              activeOpacity={1}
              style={[styles.authButton, styles.authButtonBlurredOverlay]}
              onPress={() => {
                props.navigation.navigate('Login');
              }}
            >
              <Text style={styles.authButtonBlurredText}>Login</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
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
