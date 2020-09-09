/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Registration screen
 */

import React, {useState} from 'react';
import {TextInput, Text, TouchableOpacity, Image, View} from 'react-native';
import AuthActions from 'store/actions/auth.actions';
import api from 'api/api';
import styles from 'styles/styles';

import logoImage from 'assets/images/logo.png';

const RegisterScreen = (props: any) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.centered}>
      <Image source={logoImage} style={styles.authLogo}></Image>
      <View style={styles.authTextInput}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          textContentType="username"
          autoCapitalize="none"
          onSubmitEditing={() => {
            this.secondTextInput.focus();
          }}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.authTextInput}>
        <TextInput
          ref={input => {
            this.secondTextInput = input;
          }}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.authTextInput}>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          textContentType="name"
        />
      </View>
      <View style={styles.authTextInput}>
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          textContentType="familyName"
        />
      </View>
      <View style={styles.authTextInput}>
        <TextInput
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          textContentType="telephoneNumber"
          keyboardType="phone-pad"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.authTextInput}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          textContentType="newPassword"
          autoCapitalize="none"
          secureTextEntry={true}
          clearTextOnFocus={true}
        />
      </View>
      <View style={styles.authButtonContainerMiddle}>
        <View
          style={[
            styles.authButton,
            styles.greyBackground,
            styles.authButtonMargins,
          ]}
        >
          <Text style={styles.authButtonBlurredText}>Continue</Text>
        </View>
      </View>
      <View style={styles.authButtonContainerMiddle}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.authButton, styles.authButtonBlackOverlay]}
          onPress={() => {
            const data = {
              username: username,
              password: password,
              first_name: firstName,
              last_name: lastName,
              email: email,
              phone_number: phoneNumber,
            };
            api
              .Login(data)
              .then(token => {
                AuthActions.SignUp();
                props.navigation.navigate('Login');
              })
              .catch(err => {
                console.log(err);
              });
          }}
        >
          <Text style={styles.authButtonBlurredText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state: any) => state;

const mapDispatchToProps = () => {
  return {
    SignUp: AuthActions.SignUp,
  };
};
import {connect} from 'react-redux';
export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
