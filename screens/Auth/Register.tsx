/**
 * @author Matthew P. Burruss
 * @date 1/27/2021
 * @desc Registration screen
 */

import React, { useState, FC } from 'react';
import {
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  Image,
  View,
  Alert,
  StyleSheet,
  ScrollView,
  ImageSourcePropType,
} from 'react-native';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';

import AuthButton from 'components/Auth.Button';
import PasswordInput from 'screens/Auth/containers/PasswordInput';
import AuthTextInput from 'screens/Auth/components/BasicTextInput';
import PhoneNumberTextInput from 'screens/Auth/components/PhoneNumberTextInput';
import LoadingAll from 'components/Common/LoadingAll';
import SafeArea from 'components/Common/SafeArea';
import api, { APIErrorType } from 'api/api';
import { Session } from 'store/types/auth.types';
import AuthSelectors from 'store/selectors/auth.selectors';
import AuthStyles from 'styles/Auth/Auth.Styles';

import { RootAction } from 'store/index';

import { RegisterProp } from 'types/Navigation/auth.navigation.types';

import logoImage from 'assets/images/logo.png';

const RegisterStyles = StyleSheet.create({
  authHeaderText: {
    marginBottom: 15,
    fontFamily: 'CircularBlack',
    fontSize: 24,
    color: 'tan',
  },
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  SignUp: async (session: Session) => {
    await AuthSelectors.authenticate(dispatch, session);
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type IProps = PropsFromRedux & RegisterProp;

const RegisterScreen: FC<IProps> = ({ SignUp }: IProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passwordConfirmed, confirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!username) {
      return Alert.alert('Username is required');
    } if (!phoneNumber) {
      return Alert.alert('Phone number is required');
    } if (!email) {
      Alert.alert('Email is required');
    } else if (!password) {
      return Alert.alert('Password is required');
    }
    if (!passwordConfirmed && password) {
      return Alert.alert('Please enter and confirm a new password');
    }
    setLoading(true);
    return api.Auth.SignUp(email, phoneNumber, username, password, firstName, lastName)
      .then(async (session: Session) => {
        await SignUp(session);
      })
      .catch((err: APIErrorType) => {
        setLoading(false);
        Alert.alert(err.error);
      });
  };
  const headerText = 'W E L C O M E';
  const LoadingAnimation = loading ? <LoadingAll /> : undefined;
  return (
    <SafeArea>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={[AuthStyles.TopContainer]}>
            <Image source={logoImage as ImageSourcePropType} style={AuthStyles.Logo} />
            <Text style={RegisterStyles.authHeaderText}>{headerText}</Text>
            <View style={AuthStyles.InputContainerMain}>
              <Text style={AuthStyles.Label}>Username:</Text>
              <AuthTextInput
                placeHolder="Username"
                value={username}
                setValue={setUsername}
                textContentType="username"
              />
              <Text style={AuthStyles.Label}>First name (optional):</Text>
              <AuthTextInput
                placeHolder="First Name"
                value={firstName}
                setValue={setFirstName}
                textContentType="name"
              />
              <Text style={AuthStyles.Label}>Last name (optional):</Text>
              <AuthTextInput
                placeHolder="Last Name"
                value={lastName}
                setValue={setLastName}
                textContentType="familyName"
              />
              <Text style={AuthStyles.Label}>
                Phone number (select country code below):
              </Text>
              <PhoneNumberTextInput setValue={setPhoneNumber} />
              <Text style={AuthStyles.Label}>Email address:</Text>
              <AuthTextInput
                placeHolder="Email"
                value={email}
                setValue={setEmail}
                textContentType="emailAddress"
              />
              <PasswordInput
                labelPassword="Password"
                labelConfirmPassword="Confirm password:"
                setPassword={setPassword}
                confirmPassword={confirmPassword}
              />
            </View>
            <View
              style={{
                width: '100%',
                marginTop: 50,
              }}
            />
          </View>
          <AuthButton text="Register" mode="dark" onPress={handleSubmit} />
          {LoadingAnimation}
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeArea>
  );
};

export default connector(RegisterScreen) as FC<IProps>;
