"use strict";

import React from 'react';
import {StyleSheet,Text,View,Button,AsyncStorage } from 'react-native';

const HomeScreen = (props : any) => {
    return (
        <View style={styles.container}>
            <Text>Welcome to Locker!</Text>
            <Button title="LogOut" onPress={async () => {
                await AsyncStorage.setItem('token',"");
                props.navigation.navigate('Auth');
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

export default HomeScreen;
