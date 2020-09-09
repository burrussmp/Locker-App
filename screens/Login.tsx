/**
  * @author Matthew P. Burruss
  * @date Aug 2020
  * @desc Login Screen
*/

import React, {useState,useEffect} from 'react';
import { TextInput, Text, TouchableOpacity, Image, View, Button}  from 'react-native';
import { connect } from 'react-redux';

import AuthActions from 'store/actions/auth.actions';
import api from 'api/api';
import styles from 'styles/styles'

const logoImagePath= '../assets/images/logo.png';

const LoginScreen = (props : any) => {
  const [loginInfo, setLoginInfo] = useState('');
  const [password, setPassword] = useState('');
  return (
      <View style={styles.centered}>
        <Image 
          source={require(logoImagePath)}
          style={styles.authLogo}>
        </Image>
        <View style={styles.authTextInput}>
          <TextInput
            placeholder='Username, Email, or Phone Number'
            value={loginInfo}
            onChangeText={setLoginInfo}
            textContentType='username'
            autoCapitalize='none'
          />
        </View>
        <View style={styles.authTextInput}>
          <TextInput
            placeholder='Password'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textContentType='password'
          />
        </View>
        <View style={styles.authButtonContainerMiddle}>
          <View
            style={[styles.authButton, styles.greyBackground, styles.authButtonMargins]}>
            <Text style={styles.authButtonBlurredText}>Login</Text>
          </View>
        </View>
        <View style={styles.authButtonContainerMiddle}>
          <TouchableOpacity
              activeOpacity={1}
              style={[styles.authButton, styles.authButtonBlackOverlay]}
              onPress={()=> {
                let data = {
                  'login':loginInfo,
                  'password':password
                };
                api.Login(data).then(token=>{
                  props.Login(token);
                }).catch(err=>{
                  console.log(err);
                })
              }}>
              <Text style={styles.authButtonBlurredText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
}

const mapDispatchToProps = (dispatch : any) => {
  return {
    "Login": (token : string) => {dispatch(AuthActions.Login(token))}
  }
};

export default connect(
  null,
  mapDispatchToProps
)(LoginScreen)