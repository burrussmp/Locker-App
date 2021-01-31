/* eslint-disable @typescript-eslint/no-unused-vars */

// outside imports
import React, { useState, useEffect } from 'react';
// services
import { Alert } from 'react-native';
import api, { APIErrorType } from 'api/api';
import authSelectors from 'store/selectors/auth.selectors';
// high level containers (well actually profile header is a component rn)
import SafeArea from 'components/Common/SafeArea';
import ProfileHeader from 'components/Profile/Profile.Header';
import ProfileLoading from 'components/Common/LoadingRelative';
import ProfileNavigation from 'components/Profile/Profile.Navigation';
// types
import { ProfileHeaderData } from 'types/Profile/profile';

type IProps = {
  userId: string;
}

const ProfileScreen = ({ userId }: IProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [headerData, setHeaderData] = useState(null as ProfileHeaderData);
  const isMyProfile = userId === authSelectors.getMyID();
  useEffect(() => {
    (() => {
      api.User.GetByID(userId).then((userInfo) => {
        setHeaderData({
          userInfo,
          isMyProfile,
        } as ProfileHeaderData);
        setIsLoaded(true);
      }).catch((err: APIErrorType) => {
        Alert.alert(err.error);
      });
    })();
  }, []);
  return !isLoaded ? (
    <ProfileLoading />
  ) : (
    <SafeArea>
      <ProfileHeader data={headerData} />
      <ProfileNavigation />
    </SafeArea>
  );
};

export default ProfileScreen;
