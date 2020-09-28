/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';
// External
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Animated, Image, Platform, Text, View} from 'react-native';
import {Avatar} from 'react-native-elements';
// Internal
import LikeButton from 'components/Post/Post.LikeButton';
import LockButton from 'components/Post/Post.LockButton';
// Services
import {
  borderRadiusAnimationStyle,
  flipAnimationTransform,
  pushOutAnimationTransform,
} from 'services/animations/PostAnimations';
import BlurHashService from 'services/BlurHashDecoder';
import icons from 'icons/icons';
// Styles
import styles from 'components/Post/Post.Styles';
import api from 'api/api';

interface PostBottomTabProps {
  bottomTabData: any;
  cardColor: number[];
  index: number;
  scrollY: Animated.Value;
  rotationDegrees: Animated.Value;
}

/**
 * @desc Renders bottom tab of post
 * @props The information from post container to render along with
 * scroll and rotation animated.value references
 */
const PostBottomTab: React.FunctionComponent<PostBottomTabProps> = (
  props: PostBottomTabProps
) => {
  // Styles
  const ComponentStyles = styles.BottomTab(props);
  // Extract props
  const bottomTabData = props.bottomTabData || {
    username: '',
    profile_photo: {blur_hash: ''},
  };
  const index = props.index;
  const scrollY = props.scrollY;
  const rotationDegrees = props.rotationDegrees;
  const author = bottomTabData.username;
  const blur_hash = bottomTabData.profile_photo.blur_hash;
  const id = bottomTabData._id;
  // State
  const [avatarURI, setAvatarURI] = useState('');
  const avatarSource = avatarURI ? {uri: avatarURI} : undefined;
  // Animations
  const scrollAnimation = borderRadiusAnimationStyle(scrollY, index);
  const flipAnimation = flipAnimationTransform(rotationDegrees, false);
  useEffect(() => {
    (async () => {
      const blur_hash_uri = blur_hash
        ? BlurHashService.BlurHashDecoder(blur_hash).getURI()
        : undefined;
      if (blur_hash_uri) {
        setAvatarURI(blur_hash_uri);
      }
      const profile_uri = (await api.Avatar.Get(id, 'xlarge')) as string;
      setAvatarURI(profile_uri);
    })();
  }, []);
  return (
    <View>
      <Animated.View style={[ComponentStyles.container, scrollAnimation]}>
        <Animated.View
          style={[
            ComponentStyles.flippedContainer,
            scrollAnimation,
            flipAnimation,
          ]}
        />
        <View style={ComponentStyles.alignmentView}>
          <View style={ComponentStyles.userContainer}>
            <Avatar
              source={avatarSource}
              rounded
              containerStyle={ComponentStyles.avatarContainer}
            />
            <Text style={ComponentStyles.userText}>{author}</Text>
          </View>
          <View style={ComponentStyles.moreContainer}>
            <Image
              source={icons.more.more}
              style={ComponentStyles.moreButton}
            />
          </View>
          <View style={ComponentStyles.reactionContainer}>
            <LikeButton />
            <View style={ComponentStyles.reactionPadding} />
            <LockButton />
          </View>
        </View>
      </Animated.View>
      <Animated.View
        style={[ComponentStyles.containerShadow, scrollAnimation]}
      />
    </View>
  );
};

PostBottomTab.defaultProps = {
  index: 0,
  scrollY: new Animated.Value(0),
  rotationDegrees: new Animated.Value(0),
};

export default PostBottomTab;
