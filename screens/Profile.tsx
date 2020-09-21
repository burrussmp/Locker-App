/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';
// outside imports
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
// services
import api from 'api/api';
import authSelectors from 'store/selectors/auth.selectors';
// high level containers (well actually profile header is a component rn)
import ProfileHeader from 'components/Profile/Profile.Header';
import ProfileLoading from 'components/Profile/Profile.Loading';
import ProfileNavigation from 'components/Profile/Profile.Navigation';
// styles
import styles from 'styles/styles';
// types
import {ProfileHeaderData} from 'components/Profile/Profile.Types';

const ProfileScreen = (props: any) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [headerData, setHeaderData] = useState(null as ProfileHeaderData);
  const userId = props.userId;
  const isMyProfile = userId === authSelectors.getMyID();

  useEffect(() => {
    (async () => {
      try {
        const avatarURI = await api.Avatar.Get(userId, 'large');
        const userInfo = await api.User.GetByID(userId);
        setHeaderData({
          avatarURI: avatarURI,
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
    <SafeAreaView style={styles.droidSafeArea}>
      <ProfileHeader data={headerData} />
      <ProfileNavigation />
    </SafeAreaView>
  );
};

export default ProfileScreen;
