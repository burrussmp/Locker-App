/* eslint-disable @typescript-eslint/no-unused-vars */

// outside imports
import React, { useState, useEffect } from 'react';
// services
import api from 'api/api';
import authSelectors from 'store/selectors/auth.selectors';
// high level containers (well actually profile header is a component rn)
import SafeArea from 'components/Common/SafeArea';
import ProfileHeader from 'components/Profile/Profile.Header';
import ProfileLoading from 'components/Common/LoadingRelative';
import ProfileNavigation from 'components/Profile/Profile.Navigation';
// types
import { ProfileHeaderData } from 'types/Profile/profile';

const ProfileScreen = (props: {userId: string}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [headerData, setHeaderData] = useState(null as ProfileHeaderData);
  const { userId } = props;
  const isMyProfile = userId === authSelectors.getMyID();
  useEffect(() => {
    (async () => {
      try {
        const userInfo = await api.User.GetByID(userId);
        setHeaderData({
          userInfo,
          isMyProfile,
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
      children={(
        <>
          <ProfileHeader data={headerData} />
          <ProfileNavigation />
        </>
      )}
    />
  );
};

export default ProfileScreen;
