import * as React from 'react';
import { FC, useEffect, useState } from 'react';

import {
  Alert, StyleSheet, Text, View,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import api, { APIErrorType } from 'api/api';
import { UserInfoType } from 'api/user';
import { LockerInfoType } from 'api/locker';
import BlurHashService from 'services/Images/BlurHashDecoder';

const styles = StyleSheet.create({
  container: {
    height: 75,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  text: {
    fontSize: 24,
    fontWeight: '800',
    color: 'black',
    marginLeft: 10,
  },
});

type IProps = {
  lockerData: LockerInfoType,
  isMyLocker: boolean,
}

const LockerHeader: FC<IProps> = ({ lockerData, isMyLocker }: IProps) => {
  const [userData, setUserData] = useState<UserInfoType | undefined>(undefined);
  const [userAvatarUri, setUserAvatarUri] = useState('');
  console.log(lockerData)
  useEffect(() => {
    let complete = false;
    api.User.GetByID(lockerData?.user).then((userInfo) => {
      if (!complete) {
        setUserData(userInfo);
      }
      if (userInfo.profile_photo?.blurhash) {
        const blurHashServicer = BlurHashService.BlurHashDecoder(userInfo.profile_photo.blurhash);
        setUserAvatarUri(blurHashServicer.getURI());
      }
      if (userInfo.profile_photo?.key) {
        api.S3.getMedia(userInfo.profile_photo?.key).then((dataUri) => {
          setUserAvatarUri(dataUri);
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

  return (
    <View>
      <View style={styles.container}>
        <Avatar
          rounded
          size={50}
          source={userAvatarUri ? { uri: userAvatarUri } : undefined}
        />
        <Text style={styles.text}>{lockerData ? lockerData.name : ''}</Text>
      </View>
    </View>
  );
};

export default LockerHeader;
