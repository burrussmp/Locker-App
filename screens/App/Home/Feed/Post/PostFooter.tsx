/**
 * @author Matthew P. Burruss
 * @date 2/1/2021
 * @desc This is the the component for a basic post
 */

import React, { useEffect, useState, FC } from 'react';
import {
  Alert, Image, Text, View, StyleSheet,
} from 'react-native';

import { Avatar } from 'react-native-elements';

import { State, TapGestureHandler, TapGestureHandlerStateChangeEvent } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import LikeButton from 'common/components/buttons/LikeButton';
import LockButton from 'common/components/buttons/LockButton';
import icons from 'icons/icons';

import api, { APIErrorType } from 'api/api';
import { PostType } from 'api/post';
import BlurHashService from 'services/Images/BlurHashDecoder';
import { OrganizationInfoType } from 'api/organization';

const PostFeedBottomHeaderStyles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignContent: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderWidth: 0.25,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowRadius: 20,
    elevation: 10,
  },
  companyContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingLeft: 17.5,
  },
  avatarImage: {
    resizeMode: 'cover',
  },
  avatarContainer: {
    borderColor: '#777',
    borderWidth: 1,
    height: 30,
    width: 30,
    borderRadius: 30,
  },
  avatarText: {
    paddingLeft: 12,
    fontSize: 16,
    fontWeight: '400',
  },
  interactionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 15,
    paddingTop: 10,
  },
  ellipsesContainer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    height: '100%',
  },
});

type IProps = {
  postData: PostType;
  orgId: string;
  numLikes: number;
  isLiked: boolean;
  handleLike: (like: boolean) => Promise<void>;
  color?: string;
};

const PostFooter: FC<IProps> = ({
  postData, numLikes, isLiked, handleLike, color, orgId,
}: IProps) => {
  const [orgData, setOrgData] = useState<OrganizationInfoType | undefined>(undefined);

  const [orgLogoURI, setOrgLogoURI] = useState('');
  const navigation = useNavigation();

  const onEllipsesTap = (event: TapGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      navigation.navigate('PostDetails', { postData });
    }
  };

  useEffect(() => {
    let complete = false;
    if (!complete) {
      api.Organization.GetByID(orgId).then((orgInfo) => {
        setOrgData(orgInfo);
        if (orgInfo.logo.blurhash) {
          const blurHashServicer = BlurHashService.BlurHashDecoder(orgInfo.logo.blurhash);
          setOrgLogoURI(blurHashServicer.getURI());
        }
        api.S3.getMedia(orgInfo.logo.key).then((dataURI) => {
          setOrgLogoURI(dataURI);
        }).catch((err: APIErrorType) => {
          Alert.alert(err.error);
        });
      }).catch((err: APIErrorType) => {
        Alert.alert(err.error);
      });
    }
    return function cleanup() {
      complete = true;
    };
  }, []);

  console.log(postData.content);
  return (
    <View style={[PostFeedBottomHeaderStyles.container, { backgroundColor: color }]}>
      <View style={PostFeedBottomHeaderStyles.companyContainer}>
        <Avatar
          source={orgLogoURI ? { uri: orgLogoURI } : undefined}
          rounded
          avatarStyle={PostFeedBottomHeaderStyles.avatarImage}
          containerStyle={PostFeedBottomHeaderStyles.avatarContainer}
          onPress={() => Alert.alert('Avatar pressed.')}
          activeOpacity={1}
        />
        <Text style={PostFeedBottomHeaderStyles.avatarText}>{orgData?.name || ''}</Text>
      </View>
      <View style={{ paddingTop: 10 }}>
        <TapGestureHandler onHandlerStateChange={onEllipsesTap}>
          <View style={PostFeedBottomHeaderStyles.ellipsesContainer}>
            <Image source={icons.more.more} style={{ opacity: 0.25 }} />
          </View>
        </TapGestureHandler>
      </View>
      <View style={PostFeedBottomHeaderStyles.interactionContainer}>
        <Text>{numLikes}</Text>
        <LikeButton onChange={handleLike} style={{ marginEnd: 5 }} isLiked={isLiked} />
        <LockButton productId={postData.content._id} initiallyIsLocked={postData.content.isLocked} />
      </View>
    </View>
  );
};

PostFooter.defaultProps = {
  color: '#fff',
};

export default PostFooter;
