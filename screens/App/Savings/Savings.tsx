/**
 * @author Matthew P. Burruss
 * @date 1/30/2021
 * @desc The cart page
*/
import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';

import {
  Alert, Button, Text, View,
} from 'react-native';
import api, { APIErrorType } from 'api/api';
import AuthActions from 'store/actions/auth.actions';

import { RootAction } from 'store/index';

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  Logout: () => {
    dispatch(AuthActions.logout());
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type IProps = PropsFromRedux;

const SavingsScreen: FC<IProps> = ({ Logout }: IProps) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Button
      title="LogOut"
      onPress={async () => api.Auth.Logout().then(() => {
        Logout();
      }).catch((err: APIErrorType) => {
        Alert.alert(err.error);
      })}
    />
    <Text>SAVINGS PAGE!</Text>
  </View>
);

export default connector(SavingsScreen) as FC<IProps>;
