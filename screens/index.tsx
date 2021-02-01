/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Create the app container with all of the stack navigations (App.js imports this)
 */
import React, {
  useEffect, useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';

import Auth from 'screens/Auth/Auth';
import App from 'screens/App/App';
import WelcomeScreen from 'screens/Auth/Welcome';

import AuthSelectors from 'store/selectors/auth.selectors';
import Splash from 'screens/App/Splash';
import api from 'api/api';
import { Session } from 'store/types/auth.types';

import { RootAction, RootState } from 'store/index';

const mapStateToProps = (state: RootState) => ({
  authState: state.auth,
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  Login: async (session: Session) => {
    await AuthSelectors.authenticate(dispatch, session);
  },
});
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type IProps = PropsFromRedux;

const Navigation = ({ authState, Login }: IProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [firstTime, setFirstTime] = useState(true);
  useEffect(() => {
    AsyncStorage.getItem('firstTime').then(async (isFirstTime: string | null) => {
      setFirstTime(isFirstTime !== 'done');
      const session = await api.Session.getSession();
      if (session) {
        await Login(session);
      }
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
  }, []);

  const Application = firstTime ? (
    <WelcomeScreen setFirstTime={setFirstTime} />
  ) : (
    <NavigationContainer>
      {AuthSelectors.isLoggedIn(authState) ? (
        <App />
      ) : (
        <Auth />
      )}
    </NavigationContainer>
  );
  return isLoading ? <Splash /> : Application;
};

export default connector(Navigation);
