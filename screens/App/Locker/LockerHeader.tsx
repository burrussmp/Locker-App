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
  userData: UserInfoType,
  isMyLocker: boolean,
  userAvatarUri: string;
}

const LockerHeader: FC<IProps> = ({
  lockerData, userData, isMyLocker, userAvatarUri,
}: IProps) => (
  <View>
    <View style={styles.container}>
      <Avatar
        rounded
        size={50}
        source={userAvatarUri ? { uri: userAvatarUri } : undefined}
      />
      <Text style={styles.text}>{isMyLocker ? 'My Locker' : `${userData?.username}'s Locker`}</Text>
    </View>
  </View>
);

export default LockerHeader;
