/**
 * @author Matthew P. Burruss
 * @date 2/1/2021
 * @desc Back of a post.
 */

import React, { FC } from 'react';
import {
  Animated, StyleSheet, Text, View,
} from 'react-native';

import { Avatar, Divider, Linking } from 'react-native-elements';

import LinkText from 'common/components/text/LinkText';

import { flipAnimationTransform } from 'services/animations/PostAnimations';
import { PostType } from 'api/post';

const PostBackStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    backfaceVisibility: 'hidden',
  },
  topRowContainer: {
    height: 150,
    width: '100%',
    paddingTop: 25,
    paddingLeft: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: '700',
  },
  priceText: {
    fontSize: 25,
    fontWeight: '200',
    marginTop: 5,
  },
  urlText: {
    fontSize: 12,
    fontWeight: '100',
  },
  smallHero: {
    height: 100,
    width: 100,
    marginRight: 25,
  },
  topRowDividerLine: {
    backgroundColor: 'black',
    marginHorizontal: 75,
  },
});

type IProps = {
  heroImage: {
    uri: string;
  },
  postData: PostType,
  rotationRef: Animated.Value,
}

const PostBack: FC<IProps> = ({ heroImage, postData, rotationRef }: IProps) => {
  const priceText = `$${postData.content.price}`;
  const productUrl = postData.content.url;
  const descriptionText = '';
  return (
    <Animated.View style={[PostBackStyles.container, flipAnimationTransform(rotationRef, false)]}>
      <View style={PostBackStyles.topRowContainer}>
        <View style={{ flex: 0.9 }}>
          <Text style={PostBackStyles.priceText}>
            {priceText}
          </Text>
          <LinkText url={productUrl} style={PostBackStyles.urlText} />
          <Text style={PostBackStyles.descriptionText} numberOfLines={5}>
            {descriptionText}
          </Text>
        </View>
        <Avatar
          source={heroImage}
          rounded
          containerStyle={PostBackStyles.smallHero}
        />
      </View>
      <View>
        <Divider style={PostBackStyles.topRowDividerLine} />
      </View>
    </Animated.View>
  );
};

export default PostBack;
