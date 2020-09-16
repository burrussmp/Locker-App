/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Create the app container with all of the stack navigations (App.js imports this)
 */

import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {connect} from 'react-redux';

import AuthNavigation from 'navigation/AuthNavigation';
import AppNavigation from 'navigation/AppNavigation';
import AuthSelectors from 'store/selectors/auth.selectors';
import Splash from 'screens/Splash';
import AuthActions from 'store/actions/auth.actions';
import api from 'api/api';
import {Session} from 'store/types/auth.types';

const Navigation = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const session = await api.session.getSession();
        await props.Login(session);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    })();
  }, []);
  return isLoading ? (
    <Splash />
  ) : (
    <NavigationContainer>
      {AuthSelectors.isLoggedIn(props.state) ? (
        <AppNavigation />
      ) : (
        <AuthNavigation />
      )}
    </NavigationContainer>
  );
};

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    Login: async (session: Session) => {
      dispatch(AuthActions.Login(session));
      if (session) {
        const verified = await api.session.verifyToken(session['access_token']);
        dispatch(AuthActions.VerifyToken(verified));
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
