/**
  * @author Matthew P. Burruss
  * @date Aug 2020
  * @desc Home screen
*/

import * as React from 'react';
import {Text,View,Button} from 'react-native';
import AuthActions from 'store/actions/auth.actions';
import api from 'api/api';
import styles from 'styles/styles';

import BottomNavigationBar from 'navigation/BottomNavigationBar';

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

const mapStateToProps = (state : any) => (state);
const mapDispatchToProps = () => {
  return {
    "Logout": AuthActions.Logout
  }
};
import { connect } from 'react-redux';
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
