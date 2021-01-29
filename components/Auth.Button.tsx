/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc This is the custom button used for login/register actions and navigation in the Auth portion of the application.
 */

import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from 'styles/styles';
import { BlurView } from 'expo-blur';

interface AuthButtonProps {
  text?: string;
  height?: number;
  mode?: 'light' | 'dark' | 'blurred';
  onPress?(): void;
}

const AuthButton: React.FunctionComponent<AuthButtonProps> = (
  props: AuthButtonProps,
) => (
  <View style={{ height: props.height }}>
    <BlurView
      tint="default"
      intensity={props.mode === 'blurred' ? 100 : 0}
      style={styles.authButton}
    >
      <View
        style={[
          styles.authButtonW,
          props.mode === 'light' ? styles.whiteBackground : {},
          props.mode === 'dark' ? styles.blackBackground : {},
        ]}
      >
        <Text
          style={
              props.mode === 'light'
                ? styles.authButtonText
                : styles.authButtonSecondaryText
            }
        >
          {props.text}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.authButton, styles.authButtonOverlay]}
        activeOpacity={1}
        onPress={() => {
          if (props.onPress) props.onPress();
        }}
      >
        <Text style={styles.authButtonSecondaryText}>{props.text}</Text>
      </TouchableOpacity>
    </BlurView>
  </View>
);

const defaultProps: AuthButtonProps = {
  text: '',
  height: 50,
  mode: 'light',
  onPress: undefined,
};

AuthButton.defaultProps = defaultProps;

export default AuthButton;
