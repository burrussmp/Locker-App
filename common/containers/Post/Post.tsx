/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc This is the the component for a basic post
 */

import React, {
  useEffect, useRef, useState, FC,
} from 'react';
import { Alert, Animated, View } from 'react-native';
import LoadingView from 'common/components/LoadingView';
import api, { APIErrorType } from 'api/api';

import { State, TapGestureHandlerStateChangeEvent } from 'react-native-gesture-handler';

import TapElement from 'common/components/TapElement';
import BottomHeader from 'common/containers/Post/Post.BottomHeader';
import PostFront from 'common/containers/Post/Post.Front';
import PostBack from 'common/containers/Post/Post.Back';

import BlurHashService from 'services/Images/BlurHashDecoder';
import { flipAnimation } from 'services/animations/PostAnimations';
import { PostType } from 'api/post';

type IProps = {
  id: string;
};

const PostContainer: FC<IProps> = ({ id }: IProps) => {
  const [isFront, setFront] = useState(false);
  const rotationDegreesRef = useRef(new Animated.Value(0)).current;
  const [postData, setPostData] = useState<PostType | undefined>(undefined);
  const [heroImageURI, setHeroImageURI] = useState('');

  useEffect(() => {
    let complete = false;
    api.Post.GetByID(id).then((postInfo) => {
      if (!complete) {
        if (postInfo.content.media.blurhash) {
          setHeroImageURI(BlurHashService.BlurHashDecoder(postInfo.content.media.blurhash).getURI());
        }
        setPostData(postInfo);
        api.S3.getMedia(postInfo.content.media.key).then((dataURI) => {
          setHeroImageURI(dataURI);
        }).catch((err: APIErrorType) => {
          Alert.alert(err.error);
        });
        // api.Organization.GetByID(postInfo.content.organization).then((orgData) => {
        //   orgData
        // }).catch((err: APIErrorType) => {
        //   Alert.alert(err.error);
        // });
      }
    }).catch((err: APIErrorType) => {
      Alert.alert(err.error);
    });
    return function cleanup() {
      complete = true;
    };
  }, []);

  useEffect(() => {
    flipAnimation(rotationDegreesRef, isFront);
  }, [isFront]);

  const onContentTap = (event: TapGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setFront(!isFront);
    }
  };

  const onContentDoubleTap = (event: TapGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      Alert.alert('Like');
      // like action goes here
    }
  };

  const author = 'Author to be added';
  const authorAvatar = 'Author avatar to be added';
  return (
    <LoadingView style={{ height: 500 }} isLoaded={Boolean(postData)}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <TapElement onSingleTap={onContentTap} onDoubleTap={onContentDoubleTap}>
          <View style={{ flex: 1 }}>
            <PostFront heroImage={{ uri: heroImageURI }} postData={postData as PostType} rotationRef={rotationDegreesRef} />
            <PostBack heroImage={{ uri: heroImageURI }} postData={postData as PostType} rotationRef={rotationDegreesRef} />
          </View>
        </TapElement>
      </View>
      <BottomHeader postData={postData as PostType} color="#fff" author={author} />
    </LoadingView>
  );
};

export default PostContainer;
