"use strict";

import React from 'react';
import {StyleSheet,Text,View,Button,AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import AuthActions from 'store/actions/auth.actions';
import config from 'config';

const Logout = async (props : any) => {
    let response = await fetch(`${config.server}/auth/logout`);
    if (response.ok){
        await AsyncStorage.setItem("token","");
        props.Logout();
        props.navigation.navigate('Auth');
    } else {
        let err = await response.json();
        console.log(err);
    }
}

const HomeScreen = (props : any) => {
    return (
        <View style={styles.container}>
            <Text>Welcome to Locker!</Text>
            <Button title="LogOut" onPress={async () => {
                await Logout(props);
            }}/>
        </View>
    );
};

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
      "Logout": AuthActions.Logout
    }
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomeScreen)
