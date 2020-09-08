/**
  * @author Matthew P. Burruss
  * @date Aug 2020
  * @desc Create the app container with all of the stack navigations (App.js imports this)
*/

import React, {useState,useEffect} from 'react';
import AuthNavigation from 'navigation/AuthNavigation';
import BottomNavigationBar from 'navigation/BottomNavigationBar';
import { NavigationContainer } from '@react-navigation/native';
import Splash from 'screens/Splash';
import AuthActions from 'store/actions/auth.actions';
import api from 'api/api';
import AuthSelector from 'store/selectors/auth.selectors';

const Navigation = (props : any) => {
  const [isLoading,setIsLoading] = useState(true);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  useEffect(() => {
    api.getToken().then((token) => {
      if (token) {
        props.Login(token);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    }).catch(err=>{
      console.log(err);
    });
  }, []);
  return isLoading ? 
    <Splash/>
    : (
    <NavigationContainer>
        {isLoggedIn ? (
          <BottomNavigationBar/>
        ) : (
          <AuthNavigation />
        )}
    </NavigationContainer>
  )
};

const mapStateToProps = (state : any) => {
  return {
    state : state
  }
};
const mapDispatchToProps = () => {
  return {
    "Login": AuthActions.Login
  }
};
import { connect } from 'react-redux';
import authSelectors from 'store/selectors/auth.selectors';
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)

