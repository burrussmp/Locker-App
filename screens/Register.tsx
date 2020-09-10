/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Registration screen
 */

import React, {useState} from 'react';
import {Keyboard, SafeAreaView, TextInput, Text, TouchableOpacity, TouchableWithoutFeedback, Image, View} from 'react-native';
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
    <SafeAreaView style={styles.topCentered}>
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
          returnKeyType="done"
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
        returnKeyType="done"
      />
      <TextInput
        style={styles.authTextInput}
        placeholder="First Name"
        placeholderTextColor="lightgrey"
        value={firstName}
        onChangeText={setFirstName}
        textContentType="name"
        returnKeyType="done"
      />
      <TextInput
        style={styles.authTextInput}
        placeholder="Last Name"
        placeholderTextColor="lightgrey"
        value={lastName}
        onChangeText={setLastName}
        textContentType="familyName"
        returnKeyType="done"
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
        returnKeyType="done"
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
        returnKeyType="done"
      />
      <View style={styles.authButtonContainer}>
        <View
          style={[
            styles.authButton,
            styles.blackBackground,
          ]}
        >
          <Text style={styles.authButtonBlurredText}>Continue</Text>
        </View>
      </View>
      <View style={styles.authButtonContainer}>
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
          <Text style={styles.authButtonBlurredText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
