/**
 * @author Matthew P. Burruss
 * @date Sep 2020
 * @desc Safe area view to avoid status bar
 */

import React, { FC } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ViewStyle,
} from 'react-native';

interface IProps {
  children: unknown;
  containerStyle?: ViewStyle;
  keyboardAvoidView?: boolean;
}
/**
 * @desc Create a safe area where content will be properly padded throughout the app.
 * @prop {ViewStyle} containerStyle Styling for the safe area container
 * @prop {boolean} keyboardAvoidView True if keyboard should avoid view False if it can cover.
 * @prop {unknown} children The children to render.
 */
const SafeArea: FC<IProps> = ({ containerStyle, keyboardAvoidView, children }: IProps) => {
  const SafeAreaStyle = { marginTop: StatusBar.currentHeight, flex: 1 };
  return (
    <View style={[SafeAreaStyle, containerStyle]}>
      {keyboardAvoidView ? (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? -100 : 20}
          enabled={Platform.OS === 'ios'}
        >
          {children as FC}
        </KeyboardAvoidingView>
      ) : (
        children as FC
      )}
    </View>
  );
};

SafeArea.defaultProps = {
  containerStyle: {},
  keyboardAvoidView: false,
};

export default SafeArea;
