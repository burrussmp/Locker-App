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
import Footer from 'screens/App/Home/Feed/Post/PostFooter';
import PostFront from 'screens/App/Home/Feed/Post/PostFront';
import PostBack from 'screens/App/Home/Feed/Post/PostBack';

import BlurHashService from 'services/Images/BlurHashDecoder';
import { flipAnimation } from 'services/animations/PostAnimations';
import { PostType } from 'api/post';
import { OrganizationInfoType } from 'api/organization';

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
          const blurHashServicer = BlurHashService.BlurHashDecoder(postInfo.content.media.blurhash);
          setHeroImageURI(blurHashServicer.getURI());
        }
        setPostData(postInfo);
        api.S3.getMedia(postInfo.content.media.key).then((dataURI) => {
          setHeroImageURI(dataURI);
        }).catch((err: APIErrorType) => {
          Alert.alert(err.error);
        });
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
      <Footer postData={postData as PostType} orgId={postData?.content.organization || ''} />
    </LoadingView>
  );
};

export default PostContainer;
