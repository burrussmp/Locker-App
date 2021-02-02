/**
 * @author Matthew P. Burruss
 * @date 2/1/2021
 * @desc Back of a post.
 */

import React, { useState, useEffect, FC } from 'react';
import {
  Alert, Animated, Button, StyleSheet, Text, View,
} from 'react-native';

import { Avatar, Divider } from 'react-native-elements';

import ImageList from 'common/containers/ImageList';
import ImageView from '@hamidfzm/react-native-image-viewing';

import LinkText from 'common/components/text/LinkText';

import { flipAnimationTransform } from 'services/animations/PostAnimations';
import { PostType } from 'api/post';

import BlurHashService from 'services/Images/BlurHashDecoder';

import api, { APIErrorType } from 'api/api';
import { ScrollView } from 'react-native-gesture-handler';

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
    height: 150,
    width: '100%',
    paddingTop: 25,
    paddingLeft: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
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
    fontSize: 17,
    fontWeight: '100',
  },
  productText: {
    fontSize: 25,
    fontWeight: '200',
    marginTop: 5,
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

type additionalMediaState = {
  key: string;
  uri: string;
};

const PostBack: FC<IProps> = ({
  heroImage, postData, rotationRef,
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
        <View style={{ flex: 0.9 }}>
          {/* <Button onPress={() => flipCard(true)} title="Go back" /> */}
          <Text style={PostBackStyles.productText}>{productName}</Text>
          <Text style={PostBackStyles.priceText}>{priceText}</Text>
          <LinkText text="Click to view product" url={productUrl} style={PostBackStyles.urlText} />
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
      <View style={{ flex: 1 }}>
        <ImageList
          images={additionalMedia.map((x: additionalMediaState) => x.uri)}
          onPress={(index: number) => {
            setImageIndex(index);
            setVisible(true);
          }}
        />
        <ImageView
          data={additionalMedia}
          getImage={(data: {uri: string}) => ({ uri: data.uri })}
          presentationStyle="overFullScreen"
          imageIndex={currentImageIndex}
          visible={visible}
          onRequestClose={() => setVisible(false)}
        />
      </View>
    </Animated.View>
  );
};

export default PostBack;
