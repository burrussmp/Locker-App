/**
  * @author Matthew P. Burruss
  * @date Aug 2020
  * @desc Registration screen
*/

import React, {useState} from 'react';
import {TextInput, View, Button } from 'react-native';
import AuthActions from 'store/actions/auth.actions'; 
import api from 'api/api';
import styles from 'styles/styles';

const RegisterScreen = (props : any) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    return (
      <View style = {styles.container_center}>
        <TextInput
          placeholder="Enter username"
          value={username}
          onChangeText={setUsername}/>
        <TextInput
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}/>
        <TextInput
          placeholder="Enter first name"
          value={firstName}
          onChangeText={setFirstName}/>
        <TextInput
          placeholder="Enter last name"
          value={lastName}
          onChangeText={setLastName}/>
        <TextInput
          placeholder="Enter phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}/>
        <TextInput
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry/>
        <Button title="Sign Up" onPress={ ()=> {
          let data = {
            "username":username,
            "password":password,
            "first_name":firstName,
            "last_name":lastName,
            "email":email,
            "phone_number":phoneNumber
          };
          api.SignUp(data).then(()=>{
            AuthActions.SignUp();
            props.navigation.navigate('Login');
          }).catch(err=>{
            console.log(err);
          });
        }}/>
      </View>
    );
}

const mapStateToProps = (state : any) => (state);
const mapDispatchToProps = () => {
  return {
    "SignUp": AuthActions.SignUp
  }
};
import { connect } from 'react-redux';
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreen);