'use strict';

import {PostType} from 'api/post';
import {Animated} from 'react-native';

export type PostData = {
  apiResponse: PostType;
  index: number;
  scrollY: Animated.Value;
} | null;

export const CONTENT = 'ProductPost';
