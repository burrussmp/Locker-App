/**
  * @author Matthew P. Burruss
  * @date Aug 2020
  * @desc Login Screen
*/

import React, {useState,useEffect} from 'react';
import {TextInput, View, Button} from 'react-native';
import Splash from 'screens/Splash';
import AuthActions from 'store/actions/auth.actions';
import api from 'api/api';
import styles from 'styles/styles'

const LoginScreen = (props : any) => {
  const [loginInfo, setLoginInfo] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading,setIsLoading] = useState(true);
  
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        let token = await api.getToken();
        if (token) {
          props.Login(token);
          props.navigation.navigate('App');
        } else {
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
      <View style={styles.container_center}>
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
        <Button title="Login" onPress={()=> {
          let data = {
            "login":loginInfo,
            "password":password
          };
          api.Login(data).then(token=>{
            props.Login(token);
            props.navigation.navigate('App');
          }).catch(err=>{
            console.log(err);
          })
        }} />
      </View>
    )
}

const mapStateToProps = (state : any) => (state);
const mapDispatchToProps = () => {
  return {
    "Login": AuthActions.Login
  }
};
import { connect } from 'react-redux';
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)