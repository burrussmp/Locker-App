/**
 * @author Matthew P. Burruss
 * @date 1/30/2021
 * @desc The cart page
*/
import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';

import {
  Alert, Button, Text, View,
} from 'react-native';
import api, { APIErrorType } from 'api/api';
import AuthActions from 'store/actions/auth.actions';
import AuthSelectors from 'store/selectors/auth.selectors';
import { RootAction } from 'store/index';
import { LockerProp } from 'types/navigation/app.navigation.types';
import { LockerProductInfoType } from 'api/locker';

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  Logout: () => {
    dispatch(AuthActions.logout());
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type IProps = PropsFromRedux & LockerProp;

const LockerScreen: FC<IProps> = ({ Logout, navigation, route }: IProps) => {
  const [lockerProducts, setLockerProducts] = useState<[LockerProductInfoType] | undefined>(undefined);
  const [focused, setFocused] = useState(false);

  const userId = route.params?.userId || AuthSelectors.getMyID();

  const lockerText = `LOCKER PAGE!\nUSER ID: ${userId}`;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      api.Locker.GetProducts().then((allLockerProducts) => {
        setLockerProducts(allLockerProducts);
      }).catch((err: APIErrorType) => {
        Alert.alert(err.error);
      });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="LogOut"
        onPress={async () => api.Auth.Logout().then(() => {
          Logout();
        }).catch((err: APIErrorType) => {
          Alert.alert(err.error);
        })}
      />
      <Text>{lockerText}</Text>
      <Text>Locker Products</Text>
      <Text>{JSON.stringify(lockerProducts)}</Text>
    </View>
  );
};

export default connector(LockerScreen) as FC<IProps>;
