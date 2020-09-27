/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Password input text
 */

import React, {useState, useEffect} from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AuthStyles from 'styles/Auth/Auth.Styles';
import AuthTextInput from 'components/Auth/BasicTextInput';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    width: '100%',
  },
  validationContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    height: 20,
  },
  validationText: {
    fontSize: 14,
    fontFamily: 'CircularBlack',
    marginRight: 2,
  },
});

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
  const watch = props.watch;
  const validator = props.validator;
  const placeholder = props.placeHolder;
  const toggleVisibility = props.toggleVisibility;
  // state
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [validationResult, setValidationResult] = useState({
    valid: false,
    message: [],
  });

  /**
   * @desc A wrapper to update the password text and call the validator
   * @param text The password text
   */
  const handleChangeText = (text: string) => {
    setPassword(text);
    setValidationResult(validator(text));
  };

  // hooks
  useEffect(() => {
    if (watch) {
      setValidationResult(validator(password));
    }
  }, [watch]);

  // extract variables
  const ValidationTextColorStyle = Object.assign({}, styles.validationText, {
    color: validationResult.valid ? 'green' : 'red',
  });

  const ValidationIcon =
    password && validationResult.valid ? (
      <Icon name={'ios-checkmark'} size={25} color={'green'} />
    ) : undefined;

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

  const validationContainer = props.hideValidation ? undefined : (
    <View style={styles.validationContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={ValidationTextColorStyle}>{validationResult.message}</Text>
        {ValidationIcon}
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      {validationContainer}
      <AuthTextInput
        placeholder={placeholder}
        value={password}
        secureTextEntry={!visible}
        onChangeText={handleChangeText}
        textContentType="password"
        visibilityIcon={VisibilityIcon}
      />
    </View>
  );
};

export default PasswordTextInput;
