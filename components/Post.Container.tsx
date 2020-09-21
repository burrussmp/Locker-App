import {ALL} from 'dns';
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc This is the the component for a basic post
 */

import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';

import PostNotExpanded from 'components/Post.NotExpanded';
import api from 'api/api';

interface PostContainerProps {
  index: number;
  id: string;
  scrollY: Animated.Value;
  onContentExpand(index: number): void;
}

const PostContainer: React.FunctionComponent<PostContainerProps> = (
  props: PostContainerProps
) => {
  const isCancelled = useRef(false);
  const [postData, setPostData] = useState([]);
  const [postContent, setPostContent] = useState([]);
  const [postImageURI, setPostImageURI] = useState('');
  const [cardColor, setCardColor] = useState('#FFFFFF');

  useEffect(() => {
    getPostData();
    return () => {
      isCancelled.current = true;
    };
  }, []);

  const getPostData = () => {
    api.Post.Basic.GetByID(props.id)
      .then(res => {
        if (!isCancelled.current) {
          setPostData(res);
          setPostContent(res.content);
          api.S3.GetMedia(res.content.media.key).then(res => {
            setPostImageURI(res);
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

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
