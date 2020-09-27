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
  TopCentered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  RowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  Logo: {
    height: 60,
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
  AuthButtonContainer: {
    position: 'relative',
    marginTop: 50,
    height: 100,
    width: '80%',
  },
  ValidationStatusContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  Label: {color: '#555', fontFamily: 'CircularBlack'},
  CountryContainer: {
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: 'tan',
    height: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default ResetPasswordStyles;
