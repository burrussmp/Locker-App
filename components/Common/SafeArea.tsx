/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @author Matthew P. Burruss
 * @date Sep 2020
 * @desc Safe area view to avoid status bar
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';

const SafeArea = (props: any) => {
  const SafeAreaStyle =
    Platform.OS === 'ios' ? {flex: 0} : {height: StatusBar.currentHeight};
  return (
    <Fragment>
      <SafeAreaView style={SafeAreaStyle} />
      {props.keyboardAvoidView ? (
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? -100 : 20}
          enabled={Platform.OS === 'ios' ? true : false}
        >
          {props.children}
        </KeyboardAvoidingView>
      ) : (
        props.children
      )}
    </Fragment>
  );
};

export default SafeArea;
