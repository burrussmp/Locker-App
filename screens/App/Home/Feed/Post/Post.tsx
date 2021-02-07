/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc This is the the component for a basic post
 */

import React, {
  useEffect, useRef, useState, useReducer, FC,
} from 'react';
import { Alert, Animated, View } from 'react-native';
import LoadingView from 'common/components/LoadingView';
import api, { APIErrorType } from 'api/api';

import { State, TapGestureHandlerStateChangeEvent } from 'react-native-gesture-handler';

import TapElement from 'common/components/TapElement';
import Footer from 'screens/App/Home/Feed/Post/PostFooter';
import PostFront from 'screens/App/Home/Feed/Post/PostFront';
import PostBack from 'screens/App/Home/Feed/Post/PostBack';
import AnimatedLock from 'common/components/animated/LockAnimated';

import BlurHashService from 'services/Images/BlurHashDecoder';
import { flipAnimation } from 'services/animations/PostAnimations';
import { PostType } from 'api/post';

import {
  ANIMATE, LOCK, setInitialLockerButtonState, lockButtonReducer, lockButtonInitialState,
} from 'common/components/buttons/LockButton';

type IProps = {
  id: string;
};

const PostContainer: FC<IProps> = ({ id }: IProps) => {
  const [isBack, setIsBack] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const rotationDegreesRef = useRef(new Animated.Value(0)).current;
  const [postData, setPostData] = useState<PostType | undefined>(undefined);
  const [heroImageURI, setHeroImageURI] = useState('');
  const [footerColor, setFooterColor] = useState('#fff');

  const [lockButtonState, lockButtonDispatch] = useReducer(lockButtonReducer, lockButtonInitialState);

  useEffect(() => {
    let complete = false;
    api.Post.GetByID(id).then(async (postInfo) => {
      if (!complete) {
        if (postInfo.content.media.blurhash) {
          const blurHashServicer = BlurHashService.BlurHashDecoder(postInfo.content.media.blurhash);
          setHeroImageURI(blurHashServicer.getURI());
          setFooterColor(blurHashServicer.getTabColor(60));
        }
        await setInitialLockerButtonState(postInfo.content._id, lockButtonDispatch);

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
    flipAnimation(rotationDegreesRef, isBack);
  }, [isBack]);

  const onContentTap = (event: TapGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setIsBack(!isBack);
    }
  };

  const onContentDoubleTap = (event: TapGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setShowAnimation(true);
      if (!lockButtonState.isLocked && lockButtonState.productId) {
        lockButtonDispatch({ type: ANIMATE, isLocked: true });
        api.Locker.AddProduct(lockButtonState.productId).then((lockerProduct) => {
          lockButtonDispatch({ type: LOCK, lockerProductId: lockerProduct._id });
        }).catch((err: APIErrorType) => {
          Alert.alert(err.error);
        });
      }
    }
  };

  return (
    <LoadingView style={{ height: 500 }} isLoaded={Boolean(postData)}>

      {!isBack
        ? (
          <>
            <TapElement onSingleTap={onContentTap} onDoubleTap={onContentDoubleTap}>
              <View style={{ flex: 1 }}>
                <PostFront heroImage={{ uri: heroImageURI }} rotationRef={rotationDegreesRef} />
              </View>
            </TapElement>
            {showAnimation && <AnimatedLock onComplete={() => setShowAnimation(false)} />}
          </>
        ) : (
          <View style={{ flex: 1 }}>
            <PostBack
              flipFront={() => setIsBack(false)}
              heroImage={{ uri: heroImageURI }}
              postData={postData as PostType}
              rotationRef={rotationDegreesRef}
            />
          </View>
        )}
      {postData
      && (
      <Footer
        lockButtonDispatch={lockButtonDispatch}
        lockButtonState={lockButtonState}
        color={footerColor}
        postData={postData}
        orgId={postData?.content.organization || ''}
      />
      )}

    </LoadingView>
  );
};

export default PostContainer;
