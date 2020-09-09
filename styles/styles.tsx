/**
  * @author Matthew P. Burruss
  * @date Aug 2020
  * @desc This should be where all styles are defined. That way, you can look for a style that could possibly be re-used
  * and allow code re-use.
*/

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    centered: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    authBackgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center',
    },
    authButtonContainer: {
        position: 'absolute',
        bottom: '15%',
        width: '100%',
        justifyContent: 'center'
    },
    authButtonContainerMiddle: {
        position: 'absolute',
        bottom: '30%',
        width: '100%',
        justifyContent: 'center'
    },
    authButton: {
        height: 50,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center'
    },
    authButtonOverlay: {
        backgroundColor: 'silver',
        opacity: 0
    },
    authButtonBlurredOverlay: {
        backgroundColor: 'white',
        opacity: 0
    },
    authButtonBlackOverlay: {
        backgroundColor: 'black',
        opacity: 0
    },
    authButtonText: {
        fontSize: 16,
        color: 'grey'
    },
    authButtonBlurredText: {
        fontSize: 16,
        color: 'white'
    },
    authButtonMargins: {
        marginTop: 30
    },
    authLogo: {
        height: '10%',
        bottom: 25,
        resizeMode: 'contain',
        tintColor: 'grey'
    },
    authTextInput: {
        position: 'relative',
        margin: -0.5,
        height: 35,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd'
    },
    logoText: {
        position: 'relative',
        bottom: 25
    },
    whiteBackground: {
        backgroundColor: 'white',
    },
    greyBackground: {
        backgroundColor: 'grey',
    },
    wrapperCustom: {
        borderRadius: 8,
        padding: 6
    },
    avatarContainer: {
      height: 125,
      flexDirection: "row",
      justifyContent: 'space-around',
      alignContent: 'flex-start',
      alignItems: 'flex-end'
    },
    profileBioView: {
      marginBottom: 20
    },
    profileName: {
      fontSize: 18,
      color: "#000",
      fontWeight: "bold"
    },
    profileLiner: {
      color: "#000",
      fontSize: 11,
      marginTop: 1,
      fontStyle: "italic"
    },
    profileHandle: {
      color: "#000",
      marginTop: 3,
      fontSize: 10,
      fontWeight: "bold"
    },
    avatarPhoto : {
      marginBottom: 20
    }
})

export default styles;