/**
 * @author Matthew P. Burruss
 * @date 1/27/2021
 * @desc Types for React navigation
*/
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type AppParamList = {
  Home: undefined;
  Explore: {
    userId?: string;
    organizationId?: string;
  };
  Locker: {
    userId?: string;
  };
  Savings: undefined
  Cart: undefined;
};

export type HomeProp = {
  navigation: StackNavigationProp<AppParamList, 'Home'>;
  route: RouteProp<AppParamList, 'Home'>;
};

export type ExploreProp = {
  navigation: StackNavigationProp<AppParamList, 'Explore'>;
  route: RouteProp<AppParamList, 'Explore'>;
};

export type LockerProp = {
  navigation: StackNavigationProp<AppParamList, 'Locker'>;
  route: RouteProp<AppParamList, 'Locker'>;
};

export type SavingsProp = {
  navigation: StackNavigationProp<AppParamList, 'Savings'>;
  route: RouteProp<AppParamList, 'Savings'>;
};

export type CartProp = {
  navigation: StackNavigationProp<AppParamList, 'Cart'>;
  route: RouteProp<AppParamList, 'Cart'>;
};
