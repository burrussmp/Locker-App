/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Registration screen
 */

import React, {useState, Fragment} from 'react';
import {
  Keyboard,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Image,
  View,
} from 'react-native';
import AuthButton from 'components/Auth.Button';
import SafeArea from 'components/Common/SafeArea';
import api from 'api/api';
import {Session} from 'store/types/auth.types';
import AuthSelectors from 'store/selectors/auth.selectors';
import styles from 'styles/styles';
import AuthStyles from 'styles/Auth/Auth.Styles';

const logoImage = require('assets/images/logo.png');

const RegisterScreen = (props: any) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const headerText = 'W E L C O M E';
  return (
    <SafeArea
      keyboardAvoidView
      children={
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={AuthStyles.TopCentered}>
            <Image source={logoImage} style={AuthStyles.Logo}></Image>
            <Text style={styles.authHeaderText}>{headerText}</Text>
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
            <View style={styles.AuthButtonContainer}>
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
                  api.Auth.SignUp(data)
                    .then(session => {
                      props.SignUp(session);
                    })
                    .catch(err => {
                      console.log(err);
                    });
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      }
    />
  );
};

const mapStateToProps = (state: any) => state;

const mapDispatchToProps = (dispatch: any) => {
  return {
    SignUp: async (session: Session) => {
      await AuthSelectors.Authenticate(dispatch, session);
    },
  };
};
import {connect} from 'react-redux';
export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
