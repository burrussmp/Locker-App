/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @author Matthew P. Burruss
 * @date Sep 2020
 * @desc Styles for login page
 */

import {StyleSheet} from 'react-native';

const LoginStyles = StyleSheet.create({
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
    width: '90%',
    alignSelf: 'center',
    alignItems: 'flex-start',
  },
  TextInput: {
    height: 35,
    width: '100%',
    paddingLeft: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    color: '#000',
  },
  TextLink: {
    color: '#12cccc',
    marginTop: 3,
    marginLeft: 10,
  },
});

export default LoginStyles;
