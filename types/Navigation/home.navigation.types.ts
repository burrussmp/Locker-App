/**
 * @author Matthew P. Burruss
 * @date 1/27/2021
 * @desc Types for React navigation
*/
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type HomeParamList = {
  Following: undefined;
  ForYou: undefined;
};

export type FollowingProp = {
  navigation: StackNavigationProp<HomeParamList, 'Following'>;
  route: RouteProp<HomeParamList, 'Following'>;
};

export type ForYouProp = {
  navigation: StackNavigationProp<HomeParamList, 'ForYou'>;
  route: RouteProp<HomeParamList, 'ForYou'>;
};
