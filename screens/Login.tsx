"use strict";

import React, {useState} from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Login } from 'Reducer';

const LoginScreen = (props : Object) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View>
        <TextInput
          placeholder="Enter username, email, or phone number"
          value={login}
          onChangeText={setLogin}
        />
        <TextInput
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Sign in" onPress={()=>Login({
          "login":login,
          "password":password
        })} />
      </View>
    );
}

export default LoginScreen;