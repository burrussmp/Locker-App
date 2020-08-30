"use strict";

import React, {useState} from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';

import config from 'config';

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
        <Button title="Sign in" onPress={() => props.navigation.navigate("Home")} />
      </View>
    );
}


export default LoginScreen;