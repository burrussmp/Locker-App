/**
 * @author Matthew P. Burruss
 * @date 1/27/2021
 * @desc Types for React navigation
*/
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type AuthParamList = {
  Auth: undefined;
  Login: {
    login?: string;
  };
  Register: undefined;
  ForgotPassword: undefined
  ResetPassword: {
    'cognito_username': string,
    'email': string,
  };
};

export type ResetPasswordProp = {
  navigation: StackNavigationProp<AuthParamList, 'ResetPassword'>;
  route: RouteProp<AuthParamList, 'ResetPassword'>;
};

export type ForgotPasswordProp = {
  navigation: StackNavigationProp<AuthParamList, 'ForgotPassword'>;
  route: RouteProp<AuthParamList, 'ForgotPassword'>;
};
