/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @author Matthew P. Burruss
 * @date Sep 2020
 * @desc Styles for forgot password page
 */

import {StyleSheet} from 'react-native';

const ForgotPasswordStyles = StyleSheet.create({
  TopContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    height: 80,
    top: 25,
    marginBottom: 50,
    resizeMode: 'contain',
    tintColor: 'tan',
  },
  TextInputContainer: {
    width: '70%',
    alignSelf: 'center',
    alignItems: 'flex-start',
  },
  TextInput: {
    marginTop: 15,
    height: 45,
    width: '100%',
    paddingLeft: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    color: '#000',
    fontSize: 16,
  },
  PromptText: {
    fontSize: 24,
    fontFamily: 'CircularBlack',
    alignSelf: 'center',
    textAlign: 'center',
  },
  TextLink: {
    color: '#12cccc',
    marginTop: 3,
  },
  Button: {
    marginTop: 10,
  },
  authButtonContainer: {
    position: 'absolute',
    bottom: 50,
    height: 100,
    width: '100%',
  },
});

export default ForgotPasswordStyles;
