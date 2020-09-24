/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc This should be where all styles are defined. That way, you can look for a style that could possibly be re-used
 * and allow code re-use.
 */

import {StyleSheet, Platform, StatusBar} from 'react-native';

const styles = StyleSheet.create({
  safeArea:
    Platform.OS === 'ios'
      ? {flex: 0, backgroundColor: '#FFFFFF'}
      : {height: StatusBar.currentHeight, backgroundColor: '#FFFFFF'},
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topCentered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  authBackgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  authButtonContainer: {
    position: 'absolute',
    bottom: 50,
    height: 100,
    width: '100%',
  },
  authButton: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  authButtonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'tan',
    opacity: 0,
  },
  authButtonText: {
    fontSize: 16,
    color: '#63564B',
  },
  authButtonSecondaryText: {
    fontSize: 16,
    color: 'white',
  },
  authButtonMargins: {
    marginTop: 30,
  },
  authLogo: {
    height: 60,
    top: 25,
    marginBottom: 50,
    resizeMode: 'contain',
    tintColor: 'tan',
  },
  authTextInput: {
    position: 'relative',
    margin: -0.5,
    height: 35,
    width: '90%',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    color: '#000',
  },
  authHeaderText: {
    marginBottom: 25,
    fontFamily: 'CircularBlack',
    fontSize: 24,
    color: 'tan',
  },
  logoText: {
    position: 'relative',
    bottom: 25,
  },
  whiteBackground: {
    backgroundColor: 'white',
  },
  blackBackground: {
    backgroundColor: 'black',
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
});

export default styles;
