/**
 * @author Matthew P. Burruss
 * @date 1/27/2021
 * @desc Types for React navigation
*/
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { PostType } from 'api/post';

export type HomeParamList = {
  Feed: undefined;
  PostDetails: {
    postData: PostType
  };
};

export type FeedProp = {
  navigation: StackNavigationProp<HomeParamList, 'Feed'>;
  route: RouteProp<HomeParamList, 'Feed'>;
};

export type PostDetailsProp = {
  navigation: StackNavigationProp<HomeParamList, 'PostDetails'>;
  route: RouteProp<HomeParamList, 'PostDetails'>;
};
