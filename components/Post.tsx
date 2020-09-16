import {ALL} from 'dns';
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc This is the the component for a basic post
 */

import * as React from 'react';
import {Animated} from 'react-native';

import PostNotExpanded from 'components/Post.NotExpanded';

interface PostProps {
  index: number;
  scrollY: Animated.Value;
  onContentExpand(index: number): void;
}

const Post: React.FunctionComponent<PostProps> = (props: PostProps) => {
  return (
    <PostNotExpanded
      index={props.index}
      scrollY={props.scrollY}
      onContentExpand={props.onContentExpand}
    />
  );
};

export default Post;
