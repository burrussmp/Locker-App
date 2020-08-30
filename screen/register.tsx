"use strict";

import React,{useState} from 'react';
import {StyleSheet, Text, View, TextInput, ToucheableOpacity} from 'react-native';


export interface RegistrationTextInputProps {
    placeholder: string;
  }
  
const RegistrationTextInput: React.FC<RegistrationTextInputProps> = (props) => {
    const [text, setText] = useState(props.placeholder);
    return (
        <TextInput
            style={{height:40}}
            placeholder={props.placeholder}
            onChangeText={text => setText(text)}
            defaultValue={text}
        />
    )
};

const Registration = () => {
    return (
        <View>
            <RegistrationTextInput placeholder="Username"></RegistrationTextInput>
            <RegistrationTextInput placeholder="Email"></RegistrationTextInput>
            <RegistrationTextInput placeholder="Phone Number"></RegistrationTextInput>
            <RegistrationTextInput placeholder="First Name"></RegistrationTextInput>
            <RegistrationTextInput placeholder="Last Name"></RegistrationTextInput>
            <RegistrationTextInput placeholder="Password"></RegistrationTextInput>
        </View>
    )
} ;

const styles = StyleSheet.create({
    
})
  
export default Registration;
  