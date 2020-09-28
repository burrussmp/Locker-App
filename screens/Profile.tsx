/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';
// outside imports
import React, {useState, useEffect} from 'react';
// services
import api from 'api/api';
import authSelectors from 'store/selectors/auth.selectors';
// high level containers (well actually profile header is a component rn)
import SafeArea from 'components/Common/SafeArea';
import ProfileHeader from 'components/Profile/Profile.Header';
import ProfileLoading from 'components/Common/LoadingRelative';
import ProfileNavigation from 'components/Profile/Profile.Navigation';
// types
import {ProfileHeaderData} from 'types/Profile/Profile.Types';

const ProfileScreen = (props: {userId: string}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [headerData, setHeaderData] = useState(null as ProfileHeaderData);
  const userId = props.userId;
  const isMyProfile = userId === authSelectors.getMyID();
  useEffect(() => {
    (async () => {
      try {
        const userInfo = await api.User.GetByID(userId);
        setHeaderData({
          userInfo: userInfo,
          isMyProfile: isMyProfile,
        } as ProfileHeaderData);
        setIsLoaded(true);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return !isLoaded ? (
    <ProfileLoading />
  ) : (
    <SafeArea
      children={
        <>
          <ProfileHeader data={headerData} />
          <ProfileNavigation />
        </>
      }
    />
  );
};

export default ProfileScreen;
