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

const Navigation = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    api
      .getToken()
      .then(token => {
        if (token) {
          props.Login(token);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return isLoading ? (
    <Splash />
  ) : (
    <NavigationContainer onStateChange={state => console.log(state)}>
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
    Login: (token: string) => {
      dispatch(AuthActions.Login(token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
