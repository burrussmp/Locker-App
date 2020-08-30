"use strict";

import React, {useState} from 'react';
import { AsyncStorage, TextInput, View, Button } from 'react-native';
import { connect } from 'react-redux';

import { Login } from 'Reducer';
import config from 'config';


const login = async (loginInfo : Object, props: any) => {
  loginInfo = config.default_user;
  let response = await fetch(`${config.server}/auth/login`,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
    body: JSON.stringify(loginInfo)
  });
  if (response.ok){
    let result = await response.json();
    await AsyncStorage.setItem("token",result.token);
    props.Login(result.token);
    props.navigation.navigate('Home');
  } else {
    let err = await response.json();
    console.log(err);
  }
}

const LoginScreen = (props : any) => {
    const [loginInfo, setLoginInfo] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View>
        <TextInput
          placeholder="Enter username, email, or phone number"
          value={loginInfo}
          onChangeText={setLoginInfo}
        />
        <TextInput
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={()=>
          login({
            "login":loginInfo,
            "password":password
          },props
        )} />
      </View>
    );
}

const mapStateToProps = (state : any) => (state);
const mapDispatchToProps = { Login };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)
