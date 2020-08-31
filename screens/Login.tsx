"use strict";

import React, {useState,useEffect} from 'react';
import { AsyncStorage, TextInput, View, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Login } from 'Reducer';
import config from 'config';
import Splash from 'screens/Splash';


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
    props.navigation.navigate('App');
  } else {
    let err = await response.json();
    console.log(err);
  }
}

const LoginScreen = (props : any) => {
  const [loginInfo, setLoginInfo] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading,setIsLoading] = useState(true);
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        let token = await AsyncStorage.getItem('token');
        if (token) {
          props.Login(token);
          console.log('logged in')
          props.navigation.navigate('App');
        } else {
          console.log('Not logged in.');
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    bootstrapAsync();
  }, []);
  return isLoading ? 
    <Splash/>
    : (
      <View style={styles.container}>
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
    )
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
const mapDispatchToProps = { Login };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)
