/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc Landing Screen
 */

import React, { FC } from 'react';
import {
  ImageBackground, Image, View, ImageSourcePropType,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import SafeArea from 'common/components/SafeArea';
import AuthButton from 'screens/Auth/components/Basic.Button';
import styles from 'styles/styles';

import backgroundImage from 'assets/images/splash.png';
import logoTextImage from 'assets/images/logo_text.png';
import logoImage from 'assets/images/logo.png';

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: StackNavigationProp<any, any>
}

const Landing: FC<IProps> = ({ navigation }: IProps) => (
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
              navigation.navigate('Register');
            }}
          />
          <AuthButton
            text="Login"
            mode="blurred"
            onPress={() => {
              navigation.navigate('Login');
            }}
          />
        </View>
      </ImageBackground>
    </View>
  </SafeArea>
);

export default Landing;
