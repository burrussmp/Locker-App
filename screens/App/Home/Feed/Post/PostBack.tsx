/**
 * @author Matthew P. Burruss
 * @date 2/1/2021
 * @desc Back of a post.
 */

import React, { useState, useEffect, FC } from 'react';
import {
  Alert, Animated, Image, StyleSheet, Platform, Text, View,
} from 'react-native';

import { Divider } from 'react-native-elements';

import ImageList from 'common/containers/ImageList';

import ImageView from 'react-native-image-viewing';

import LinkText from 'common/components/text/LinkText';
import GoBackButton from 'common/components/buttons/GoBackButton';
import { flipAnimationTransform } from 'services/animations/PostAnimations';
import { PostType } from 'api/post';

import BlurHashService from 'services/Images/BlurHashDecoder';

import api, { APIErrorType } from 'api/api';

const PostBackStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    backfaceVisibility: 'hidden',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderWidth: 0.25,
    borderColor: '#ccc',
    elevation: 5,
  },
  topRowContainer: {
    height: 125,
    width: '100%',
    paddingTop: 15,
    paddingLeft: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: '700',
  },
  priceText: {
    fontSize: 17,
    fontWeight: '100',
  },
  productText: {
    fontSize: 20,
    fontWeight: '200',
  },
  urlText: {
    fontSize: 13,
    fontWeight: '100',
  },
  smallHero: {
    height: 100,
    width: 100,
    marginRight: 25,
  },
  topRowDividerLine: {
    backgroundColor: 'black',
    marginHorizontal: 20,
  },
});

type IProps = {
  heroImage: {
    uri: string;
  },
  postData: PostType,
  rotationRef: Animated.Value,
  flipFront: () => void;
}

type additionalMediaState = {
  key: string;
  uri: string;
};

const PostBack: FC<IProps> = ({
  heroImage, postData, rotationRef, flipFront,
}: IProps) => {
  const [additionalMedia, setAdditionalMedia] = useState<Array<additionalMediaState>>(
    postData.content.additional_media.map((x) => {
      const blurHashServicer = BlurHashService.BlurHashDecoder(x.blurhash);
      return {
        key: x.key,
        uri: blurHashServicer.getURI(),
      };
    }),
  );
  const [visible, setVisible] = useState(false);
  const [currentImageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    Promise.all(postData.content.additional_media.map(async (media) => {
      const dataURI = await api.S3.getMedia(media.key);
      return {
        key: media.key,
        uri: dataURI,
      };
    })).then((data) => {
      setAdditionalMedia(data);
    }).catch((err: APIErrorType & string) => {
      Alert.alert(err.error || err);
    });
  }, []);

  const productName = postData.content.name;
  const priceText = `$${postData.content.price}`;
  const productUrl = postData.content.url;
  const descriptionText = '';
  return (
    <Animated.View style={[PostBackStyles.container, flipAnimationTransform(rotationRef, false)]}>
      <View style={PostBackStyles.topRowContainer}>
        <View style={{
          flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start',
        }}
        >
          <GoBackButton onPress={flipFront} iconSize={30} />
          <View style={{
            flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',
          }}
          >
            <Text style={PostBackStyles.productText}>{productName}</Text>
            <Text style={PostBackStyles.priceText}>{priceText}</Text>
            <LinkText text="Click to view product" url={productUrl} style={PostBackStyles.urlText} />
            <Text style={PostBackStyles.descriptionText} numberOfLines={5}>
              {descriptionText}
            </Text>
          </View>
        </View>
        <Image
          resizeMethod="auto"
          source={heroImage}
          style={PostBackStyles.smallHero}
        />
      </View>
      <Divider style={PostBackStyles.topRowDividerLine} />
      <ImageList
        images={additionalMedia.map((x: additionalMediaState) => x.uri)}
        onPress={(index: number) => {
          setImageIndex(index);
          setVisible(true);
        }}
      />
      <ImageView
        images={additionalMedia.map((x) => ({ uri: x.uri }))}
        imageIndex={currentImageIndex}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        presentationStyle={Platform.OS === 'android' ? 'overFullScreen' : 'fullScreen'}
      />
    </Animated.View>
  );
};

export default PostBack;
