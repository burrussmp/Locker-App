/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {Button, Text, View} from 'react-native';
import api from 'api/api';
import AuthActions from 'store/actions/auth.actions';

const NotificationScreen = (props: any) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button
        title="LogOut"
        onPress={async () =>
          api.Auth.Logout()
            .then(() => {
              props.Logout();
            })
            .catch(err => {
              console.log(err);
            })
        }
      />
      <Text>Notifications!</Text>
    </View>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    Logout: () => {
      dispatch(AuthActions.Logout());
    },
  };
};

export default connect(null, mapDispatchToProps)(NotificationScreen);
