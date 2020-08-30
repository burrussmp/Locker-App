"use strict";

import React, {useState} from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SignUp } from 'Reducer';

const RegisterScreen = (props : Object) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View>
        <TextInput
          placeholder="Enter username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Enter first name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          placeholder="Enter last name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          placeholder="Enter phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Sign Up" onPress={()=>SignUp({
          "username":username,
          "password":password,
          "first_name":firstName,
          "last_name":lastName,
          "email":email,
          "phone_number":phoneNumber
        })} />
      </View>
    );
}

export default RegisterScreen;