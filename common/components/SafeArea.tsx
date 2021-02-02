/**
 * @author Matthew P. Burruss
 * @date Sep 2020
 * @desc Safe area view to avoid status bar
 */

import React, { FC } from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ViewStyle,
} from 'react-native';

interface IProps {
  children: FC | JSX.Element | JSX.Element[];
  containerStyle?: ViewStyle;
  keyboardAvoidView?: boolean;
}
/**
 * @desc Create a safe area where content will be properly padded throughout the app.
 * @prop {ViewStyle} containerStyle Styling for the safe area container
 * @prop {boolean} keyboardAvoidView True if keyboard should avoid view False if it can cover.
 * @prop {unknown} children The children to render.
 */
const SafeArea: FC<IProps> = ({
  containerStyle,
  keyboardAvoidView,
  children,
}: IProps) => {
  const SafeAreaStyle = Platform.OS === 'ios' ? { flex: 0 } : { height: StatusBar.currentHeight };
  return (
    <>
      <SafeAreaView style={[SafeAreaStyle, containerStyle]} />
      {keyboardAvoidView ? (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? -100 : 20}
          enabled={Platform.OS === 'ios'}
        >
          {children}
        </KeyboardAvoidingView>
      ) : (
        children
      )}
    </>
  );
};

SafeArea.defaultProps = {
  containerStyle: {},
  keyboardAvoidView: false,
};

export default SafeArea;
