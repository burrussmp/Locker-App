/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Registration screen
 */

import React, {useState, useRef} from 'react';
import {
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  Image,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AuthButton from 'components/Auth.Button';
import AuthTextInput from 'components/Auth/BasicTextInput';
import PasswordInput from 'containers/Auth/PasswordInput';
import PhoneNumberTextInput from 'components/Auth/PhoneNumberTextInput';
import LoadingAll from 'components/Common/LoadingAll';
import SafeArea from 'components/Common/SafeArea';
import api from 'api/api';
import {Session} from 'store/types/auth.types';
import AuthSelectors from 'store/selectors/auth.selectors';
import AuthStyles from 'styles/Auth/Auth.Styles';

const logoImage = require('assets/images/logo.png');

const RegisterStyles = StyleSheet.create({
  authHeaderText: {
    marginBottom: 15,
    fontFamily: 'CircularBlack',
    fontSize: 24,
    color: 'tan',
  },
});
const RegisterScreen = (props: any) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passwordConfirmed, confirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState('US');
  const [callingCode, setCallingCode] = useState('1');
  const handleCountryPick = (res: any) => {
    setCountryCode(res.cca2);
    setCallingCode(res.callingCode[0]);
  };
  const handleSubmit = async () => {
    if (!username) {
      return Alert.alert('Username is required');
    } else if (!phoneNumber) {
      return Alert.alert('Phone number is required');
    } else if (!email) {
      Alert.alert('Email is required');
    } else if (!password) {
      return Alert.alert('Password is required');
    }
    if (!passwordConfirmed && password) {
      return Alert.alert('Please enter and confirm a new password');
    }
    setLoading(true);
    const phone_number =
      '+' + callingCode + phoneNumber.replace(/-|\)|\(/g, '');
    const data = {
      username: username,
      password: password,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phone_number,
    };
    api.Auth.SignUp(data)
      .then(session => {
        props.SignUp(session);
      })
      .catch(err => {
        setLoading(false);
        const error = JSON.parse(err.message);
        Alert.alert(error.error);
      });
  };
  const headerText = 'W E L C O M E';
  const LoadingAnimation = loading ? <LoadingAll /> : undefined;
  return (
    <SafeArea
      children={
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <View style={[AuthStyles.TopContainer]}>
              <Image source={logoImage} style={AuthStyles.Logo}></Image>
              <Text style={RegisterStyles.authHeaderText}>{headerText}</Text>
              <View style={AuthStyles.InputContainerMain}>
                <Text style={AuthStyles.Label}>Username:</Text>
                <AuthTextInput
                  placeholder="Username"
                  value={username}
                  onChangeText={setUsername}
                  textContentType="username"
                />
                <Text style={AuthStyles.Label}>First name (optional):</Text>
                <AuthTextInput
                  placeholder="First Name"
                  value={firstName}
                  onChangeText={setFirstName}
                  textContentType="name"
                />
                <Text style={AuthStyles.Label}>Last name (optional):</Text>
                <AuthTextInput
                  placeholder="Last Name"
                  value={lastName}
                  onChangeText={setLastName}
                  textContentType="familyName"
                />
                <Text style={AuthStyles.Label}>
                  Phone number (select country code below):
                </Text>
                <PhoneNumberTextInput setPhoneNumber={setPhoneNumber} />
                <Text style={AuthStyles.Label}>Email address:</Text>
                <AuthTextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  textContentType="emailAddress"
                />
                <PasswordInput
                  labelPassword={'Password'}
                  labelConfirmPassword={'Confirm password:'}
                  setPassword={setPassword}
                  confirmPassword={confirmPassword}
                />
              </View>
              <View
                style={{
                  width: '100%',
                  marginTop: 50,
                }}
              ></View>
            </View>
            <AuthButton text="Register" mode="dark" onPress={handleSubmit} />
            {LoadingAnimation}
          </ScrollView>
        </TouchableWithoutFeedback>
      }
    />
  );
};

const mapStateToProps = (state: any) => state;

const mapDispatchToProps = (dispatch: any) => {
  return {
    SignUp: async (session: Session) => {
      await AuthSelectors.Authenticate(dispatch, session);
    },
  };
};
import {connect} from 'react-redux';
export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
