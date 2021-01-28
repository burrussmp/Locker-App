/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Create the app container with all of the stack navigations (App.js imports this)
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { connect, Dispatch } from 'react-redux';

import AuthNavigation from 'navigation/AuthNavigation';
import AppNavigation from 'navigation/AppNavigation';
import WelcomeScreen from 'screens/Auth/Welcome';
import AuthSelectors from 'store/selectors/auth.selectors';
import Splash from 'screens/Splash';
import api from 'api/api';
import { Session } from 'store/types/auth.types';

const mapStateToProps = (state: any) => ({
  state,
});

const mapDispatchToProps = (dispatch: Dispatch<>) => ({
  Login: async (session: Session) => {
    await AuthSelectors.authenticate(dispatch, session);
  },
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    label: string;
};

const Navigation: FC = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [firstTime, setFirstTime] = useState(true);
  useEffect(() => {
    AsyncStorage.getItem('firstTime').then(async (isFirstTime: string | null) => {
      setFirstTime(isFirstTime !== 'done');
      try {
        const session = await api.Session.getSession();
        await props.Login(session);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    }).catch(() => {
      setIsLoading(false);
    });
  }, []);

  const Application = firstTime ? (
    <WelcomeScreen setFirstTime={setFirstTime} />
  ) : (
    <NavigationContainer>
      {AuthSelectors.isLoggedIn(props.state) ? (
        <AppNavigation />
      ) : (
        <AuthNavigation />
      )}
    </NavigationContainer>
  );
  return isLoading ? <Splash /> : Application;
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
