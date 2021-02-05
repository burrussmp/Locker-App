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
import AnimatedLike from 'common/components/animated/AnimatedLike';

import BlurHashService from 'services/Images/BlurHashDecoder';
import { flipAnimation } from 'services/animations/PostAnimations';
import { PostType } from 'api/post';

type IProps = {
  id: string;
};

const PostContainer: FC<IProps> = ({ id }: IProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(0);
  const [isBack, setIsBack] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const rotationDegreesRef = useRef(new Animated.Value(0)).current;
  const [postData, setPostData] = useState<PostType | undefined>(undefined);
  const [heroImageURI, setHeroImageURI] = useState('');
  const [footerColor, setFooterColor] = useState('#fff');

  useEffect(() => {
    let complete = false;
    api.Post.GetByID(id).then(async (postInfo) => {
      if (!complete) {
        if (postInfo.content.media.blurhash) {
          const blurHashServicer = BlurHashService.BlurHashDecoder(postInfo.content.media.blurhash);
          setHeroImageURI(blurHashServicer.getURI());
          setFooterColor(blurHashServicer.getTabColor(60));
        }
        const reactionData = await api.Post.GetReactions(postInfo._id);
        setIsLiked(reactionData.selected === 'like');
        setNumLikes(reactionData.like);
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

  const onContentDoubleTap = async (event: TapGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      if (postData) {
        setShowAnimation(true);
        if (!isLiked) setNumLikes(numLikes + 1);
        setIsLiked(true);
        await api.Post.AddReaction(postData._id, 'like');
      }
    }
  };

  const handleLike = async (like: boolean) => {
    if (postData) {
      if (like) {
        if (!isLiked) setNumLikes(numLikes + 1);
        setIsLiked(true);
        await api.Post.AddReaction(postData._id, 'like');
      } else {
        if (isLiked) setNumLikes(numLikes - 1);
        setIsLiked(false);
        await api.Post.DeleteReaction(postData._id);
      }
    }
  };

  return (
    <LoadingView style={{ height: 500 }} isLoaded={Boolean(postData)}>
      <TapElement onSingleTap={onContentTap} onDoubleTap={onContentDoubleTap}>
        <View style={{ flex: 1 }}>
          {!isBack && <PostFront heroImage={{ uri: heroImageURI }} postData={postData as PostType} rotationRef={rotationDegreesRef} />}
        </View>
      </TapElement>
      {showAnimation && <AnimatedLike onComplete={() => setShowAnimation(false)} />}
      {isBack && (
        <PostBack
          flipFront={() => setIsBack(false)}
          heroImage={{ uri: heroImageURI }}
          postData={postData as PostType}
          rotationRef={rotationDegreesRef}
        />
      )}
      {postData
      && (
      <Footer
        handleLike={handleLike}
        isLiked={isLiked}
        numLikes={numLikes}
        color={footerColor}
        postData={postData}
        orgId={postData?.content.organization || ''}
      />
      )}

    </LoadingView>
  );
};

export default PostContainer;
