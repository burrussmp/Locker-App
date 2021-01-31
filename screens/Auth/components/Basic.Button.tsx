/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc This is the custom button used for login/register actions and navigation in the Auth portion of the application.
 */

import React, { FC } from 'react';
import {
  Text, TouchableOpacity, View,
} from 'react-native';

import styles from 'styles/styles';
import { BlurView } from 'expo-blur';

interface IProps {
  text?: string;
  height?: number;
  mode?: 'light' | 'dark' | 'blurred';
  onPress?: () => void;
}

const AuthButton: FC<IProps> = ({
  height, text, mode, onPress,
}: IProps) => (
  <View style={{ height }}>
    <BlurView
      tint="default"
      intensity={mode === 'blurred' ? 100 : 0}
      style={styles.authButton}
    >
      <View
        style={[
          styles.authButton,
          mode === 'light' ? styles.whiteBackground : {},
          mode === 'dark' ? styles.blackBackground : {},
        ]}
      >
        <Text
          style={
              mode === 'light'
                ? styles.authButtonText
                : styles.authButtonSecondaryText
            }
        >
          {text}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.authButton, styles.authButtonOverlay]}
        activeOpacity={1}
        onPress={onPress}
      >
        <Text style={styles.authButtonSecondaryText}>{text}</Text>
      </TouchableOpacity>
    </BlurView>
  </View>
);

AuthButton.defaultProps = {
  text: '',
  height: 50,
  mode: 'light',
  onPress: () => undefined,
};

export default AuthButton;
