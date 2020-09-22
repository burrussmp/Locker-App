'use strict';

import {PostType} from 'api/post';
import {UserInfoType} from 'api/user';
import {Animated} from 'react-native';

export type PostData = {
  postInfo: PostType;
  userInfo: UserInfoType;
  media: string;
  avatar: string;
  index: number;
  scrollY: Animated.Value;
} | null;
