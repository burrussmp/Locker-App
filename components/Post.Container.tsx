import {ALL} from 'dns';
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc This is the the component for a basic post
 */

import React, {useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';

import PostNotExpanded from 'components/Post/Post.NotExpanded';
import api from 'api/api';
import {
  flipAnimation,
  borderRadiusAnimationStyle,
  flipAnimationTransform,
  pushOutAnimationTransform,
} from 'services/animations/PostAnimations';

interface PostContainerProps {
  index: number;
  id: string;
  scrollY: Animated.Value;
  onContentExpand(index: number): void;
}

const PostContainer: React.FunctionComponent<PostContainerProps> = (
  props: PostContainerProps
) => {
  const [isFlipped, Flip] = useState(false);

  const isCancelled = useRef(false);
  const [postData, setPostData] = useState([]);
  const [postContent, setPostContent] = useState([]);
  const [postImageURI, setPostImageURI] = useState('');
  const [index, setIndex] = useState(-1 * props.index);
  useEffect(() => {
    api.Post.Basic.GetByID(props.id)
      .then(res => {
        if (!isCancelled.current) {
          // setPostData(res);
          // setPostContent(res.content);
          // api.S3.GetMedia(res.content.media.key).then(res => {
          //   setPostImageURI(res);
          // });
          setIndex(index + 1);
        }
      })
      .catch(err => {
        console.log(err);
      });
    return () => {
      isCancelled.current = true;
    };
  }, []);

  return (
    <PostNotExpanded
      index={props.index}
      data={postData}
      content={postContent}
      image={postImageURI}
      scrollY={props.scrollY}
      onContentExpand={props.onContentExpand}
    />
  );
};

export default PostContainer;
