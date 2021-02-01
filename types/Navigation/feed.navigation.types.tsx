/**
 * @author Matthew P. Burruss
 * @date 1/27/2021
 * @desc Types for React navigation
*/
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type FeedParamList = {
  Following: undefined;
  'For You' : undefined;
};

export type FollowingProp = {
  navigation: StackNavigationProp<FeedParamList, 'Following'>;
  route: RouteProp<FeedParamList, 'Following'>;
};

export type ForYouProp = {
  navigation: StackNavigationProp<FeedParamList, 'For You'>;
  route: RouteProp<FeedParamList, 'For You'>;
};
