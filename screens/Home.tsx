/**
  * @author Matthew P. Burruss
  * @date Aug 2020
  * @desc Home screen
*/

import React from 'react';
import {Text,View,Button,ScrollView} from 'react-native';
import AuthActions from 'store/actions/auth.actions';
import api from 'api/api';
import styles from 'styles/styles';

const HomeScreen = (props : any) => {
  return (
    <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
            margin: 20
        }}>
      <Button title="LogOut" onPress={async () =>
              api.Logout().then(()=>{
                props.Logout();
              }).catch(err=>{
                console.log(err);
              })
          }/>
      <View style={{width: 200, height: 200, backgroundColor: 'powderblue'}} />
      <View style={{width: 200, height: 200, backgroundColor: 'skyblue'}} />
      <View style={{width: 200, height: 200, backgroundColor: 'steelblue'}} />
      <View style={{width: 200, height: 200, backgroundColor: 'powderblue'}} />
      <View style={{width: 200, height: 200, backgroundColor: 'skyblue'}} />
      <View style={{width: 200, height: 200, backgroundColor: 'steelblue'}} />
      <View style={{width: 200, height: 200, backgroundColor: 'powderblue'}} />
      <View style={{width: 200, height: 200, backgroundColor: 'skyblue'}} />
      <View style={{width: 200, height: 200, backgroundColor: 'steelblue'}} />
      <View style={{width: 200, height: 200, backgroundColor: 'powderblue'}} />
      <View style={{width: 200, height: 200, backgroundColor: 'skyblue'}} />
      <View style={{width: 200, height: 200, backgroundColor: 'steelblue'}} />
      <View style={{width: 200, height: 200, backgroundColor: 'steelblue'}} />
      <View style={{width: 200, height: 200, backgroundColor: 'powderblue'}} />
      <View style={{width: 200, height: 200, backgroundColor: 'skyblue'}} />
      <View style={{width: 200, height: 200, backgroundColor: 'steelblue'}} />
    </ScrollView>
  );
};

const mapStateToProps = (state : any) => (state);
const mapDispatchToProps = (dispatch : any) => {
  return {
    "Logout": () => {dispatch(AuthActions.Logout())} 
  }
};
import { connect } from 'react-redux';
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
