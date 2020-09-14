/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Registration screen
 */

import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Keyboard,
  SafeAreaView,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Image,
  Platform,
  View,
} from 'react-native';
import AuthActions from 'store/actions/auth.actions';
import AuthButton from 'components/Auth.Button';
import api from 'api/api';
import styles from 'styles/styles';

const logoImage = require('assets/images/logo.png');

const RegisterScreen = (props: any) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS == 'ios' ? -100 : 20}
        enabled={Platform.OS === 'ios' ? true : false}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.topCentered}>
            <Image source={logoImage} style={styles.authLogo}></Image>
            <Text style={styles.authHeaderText}>W E L C O M E</Text>
            <TextInput
              style={styles.authTextInput}
              placeholder="Username"
              placeholderTextColor="lightgrey"
              value={username}
              onChangeText={setUsername}
              textContentType="username"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.authTextInput}
              placeholder="Email"
              placeholderTextColor="lightgrey"
              value={email}
              onChangeText={setEmail}
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.authTextInput}
              placeholder="First Name"
              placeholderTextColor="lightgrey"
              value={firstName}
              onChangeText={setFirstName}
              textContentType="name"
            />
            <TextInput
              style={styles.authTextInput}
              placeholder="Last Name"
              placeholderTextColor="lightgrey"
              value={lastName}
              onChangeText={setLastName}
              textContentType="familyName"
            />
            <TextInput
              style={styles.authTextInput}
              placeholder="Phone Number"
              placeholderTextColor="lightgrey"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              textContentType="telephoneNumber"
              keyboardType="phone-pad"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.authTextInput}
              placeholder="Password"
              placeholderTextColor="lightgrey"
              value={password}
              onChangeText={setPassword}
              textContentType="newPassword"
              autoCapitalize="none"
              secureTextEntry={true}
            />
            <View style={styles.authButtonContainer}>
              <AuthButton
                text="Continue"
                mode="dark"
                onPress={() => {
                  const data = {
                    username: username,
                    password: password,
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone_number: phoneNumber,
                  };
                  console.log(data);
                  api
                    .SignUp(data)
                    .then(token => {
                      props.SignUp(token);
                    })
                    .catch((err: any) => {
                      console.log(err);
                    });
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: any) => state;

const mapDispatchToProps = (dispatch: any) => {
  return {
    SignUp: (token: string) => {
      dispatch(AuthActions.SignUp(token));
    },
  };
};
import {connect} from 'react-redux';
export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
