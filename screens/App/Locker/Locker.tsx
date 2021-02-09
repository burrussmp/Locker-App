/**
 * @author Matthew P. Burruss
 * @date 1/30/2021
 * @desc The cart page
 */
import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';

import { Alert } from 'react-native';
import api, { APIErrorType } from 'api/api';
import AuthActions from 'store/actions/auth.actions';
import AuthSelectors from 'store/selectors/auth.selectors';
import { RootAction } from 'store/index';
import { LockerProp } from 'types/navigation/app.navigation.types';
import { LockerInfoType, LockerProductInfoType } from 'api/locker';
import SafeArea from 'common/components/SafeArea';
import { UserInfoType } from 'api/user';
import BlurHashService from 'services/Images/BlurHashDecoder';
import LockerHeader from './LockerHeader';

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  Logout: () => {
    dispatch(AuthActions.logout());
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type IProps = PropsFromRedux & LockerProp;

const LockerScreen: FC<IProps> = ({ Logout, navigation, route }: IProps) => {
  const userId = route.params?.userId || AuthSelectors.getMyID();
  const isMyLocker = userId === AuthSelectors.getMyID();
  const [lockerData, setLockerData] = useState<LockerInfoType | undefined>(
    undefined,
  );
  const [userData, setUserData] = useState<UserInfoType | undefined>(undefined);
  const [userAvatarUri, setUserAvatarUri] = useState('');

  useEffect(() => {
    api.Locker.GetAll(userId)
      .then((lockerList) => {
        const lockerId = lockerList[0]._id;
        api.Locker.GetByID(lockerId)
          .then((lockerInfo) => {
            setLockerData(lockerInfo);
            api.User.GetByID(lockerInfo.user)
              .then((userInfo) => {
                setUserData(userInfo);
                if (userInfo.profile_photo?.blurhash) {
                  const blurHashService = BlurHashService.BlurHashDecoder(
                    userInfo.profile_photo.blurhash,
                  );
                  setUserAvatarUri(blurHashService.getURI());
                }
                if (userInfo.profile_photo?.key) {
                  api.S3.getMedia(userInfo.profile_photo?.key)
                    .then((dataUri) => {
                      setUserAvatarUri(dataUri);
                    })
                    .catch((err: APIErrorType) => {
                      Alert.alert(err.error);
                    });
                }
              })
              .catch((err: APIErrorType) => {
                Alert.alert(err.error);
              });
          })
          .catch((err: APIErrorType) => {
            Alert.alert(err.error);
          });
      })
      .catch((err: APIErrorType) => {
        Alert.alert(err.error);
      });
  }, []);

  return (
    <SafeArea>
      <LockerHeader
        lockerData={lockerData as LockerInfoType}
        userData={userData as UserInfoType}
        isMyLocker={isMyLocker}
        userAvatarUri={userAvatarUri}
      />
    </SafeArea>
  );
};

export default connector(LockerScreen) as FC<IProps>;
