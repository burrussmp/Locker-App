/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Password input text
 */

import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import AuthTextInput from 'components/Auth/BasicTextInput';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * @desc A password input text component
 * @param {function} validator A function to validate the input upon a change
 * @param {string} placeHolder The placeholder text for the component
 * @param {boolean} toggleVisibility If true a visibility toggle appears
 * @param {any} watch A variable to re-render when it changes. For example, if you need to confirm
 * a password, you may want to watch whenever the other field changes to re-render
 */
const PasswordTextInput = (props: any) => {
  // extract props
  const placeholder = props.placeHolder;
  const toggleVisibility = props.toggleVisibility;
  // state
  const password = props.value;
  const setPassword = props.onChangeText;
  const [visible, setVisible] = useState(false);

  const VisibilityIcon = toggleVisibility ? (
    <TouchableOpacity onPress={() => setVisible(!visible)}>
      <View style={{alignSelf: 'center', paddingRight: 10}}>
        <Icon
          name={visible ? 'ios-eye-off' : 'ios-eye'}
          size={20}
          color={'gray'}
        />
      </View>
    </TouchableOpacity>
  ) : undefined;

  return (
    <AuthTextInput
      placeholder={placeholder}
      value={password}
      secureTextEntry={!visible}
      onChangeText={setPassword}
      textContentType="password"
      rightIcon={VisibilityIcon}
    />
  );
};

export default PasswordTextInput;
