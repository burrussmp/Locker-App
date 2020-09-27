/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @author Matthew P. Burruss
 * @date Sep 2020
 * @desc Styles for login page
 */

import {StyleSheet} from 'react-native';

const ResetPasswordStyles = StyleSheet.create({
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
  InputContainerMain: {
    width: '90%',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  TextInputContainer: {
    height: 35,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TextInput: {
    paddingLeft: 10,
    color: '#000',
    flex: 1,
    fontSize: 16,
  },
  TextInputError: {
    color: 'red',
    fontSize: 14,
    fontFamily: 'CircularBlack',
    marginRight: 2,
  },
  TextLink: {
    color: '#12cccc',
    marginTop: 4,
    marginLeft: 10,
  },
  authButtonContainer: {
    position: 'relative',
    marginTop: 50,
    height: 100,
    width: '80%',
  },
});

export default ResetPasswordStyles;
