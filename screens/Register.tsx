"use strict";

import React, {useState} from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import { connect } from 'react-redux';

import config from 'config';
import AuthActions from 'store/actions/auth.actions'; 

const SignUp = async (data: any,props:any) => {
  let response = await fetch(`${config.server}/users`,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
    body: JSON.stringify(data)
  });
  if (response.ok){
    props.SignUp();
    props.navigation.navigate('Login');
  } else {
    let err = await response.json();
    console.log(err);
  }
}

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
        <Button title="Sign Up" onPress={()=>
        SignUp({
          "username":username,
          "password":password,
          "first_name":firstName,
          "last_name":lastName,
          "email":email,
          "phone_number":phoneNumber
          } , props
        )}/>
      </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = (state : any) => (state);
const mapDispatchToProps = () => {
  return {
    "SignUp": AuthActions.SignUp
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreen);