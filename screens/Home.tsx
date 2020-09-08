/**
  * @author Matthew P. Burruss
  * @date Aug 2020
  * @desc Home screen
*/

import * as React from 'react';
import { connect } from 'react-redux';
import {Text,View,Button} from 'react-native';

import AuthActions from 'store/actions/auth.actions';
import api from 'api/api';
import styles from 'styles/styles';


const HomeScreen = (props : any) => {
    return (
        <View style={styles.container_center}>
            <Text>Welcome to Locker!</Text>
            <Button title="LogOut" onPress={async () =>
                api.Logout().then(()=>{
                  props.Logout();
                }).catch(err=>{
                  console.log(err);
                })
            }/>
        </View>
    );
};

const mapDispatchToProps = (dispatch : any) => {
  return {
    "Logout": () => {dispatch(AuthActions.Logout())}
  }
};

export default connect(
  null,
  mapDispatchToProps
)(HomeScreen)
