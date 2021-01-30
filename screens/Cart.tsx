/**
 * @author Matthew P. Burruss
 * @date 1/30/2021
 * @desc The cart page
*/
import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';

import { Button, Text, View } from 'react-native';
import api from 'api/api';
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

const CartScreen: FC<IProps> = ({ Logout }: IProps) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Button
      title="LogOut"
      onPress={async () => api.Auth.Logout().then(() => {
        Logout();
      }).catch((err) => {
        console.log(err);
      })}
    />
    <Text>Notifications!</Text>
  </View>
);

export default connector(CartScreen) as FC<IProps>;
