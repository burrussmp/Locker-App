/**
 * @author Matthew P. Burruss
 * @date 1/27/2021
 * @desc Profile
*/

// outside imports
import React, { useState, useEffect, FC } from 'react';
// services
import { Alert } from 'react-native';
import api, { APIErrorType } from 'api/api';
import authSelectors from 'store/selectors/auth.selectors';
// high level containers (well actually profile header is a component rn)
import SafeArea from 'common/components/SafeArea';
import ProfileHeader from 'screens/App/Profile/components/Profile.Header';
import ProfileLoading from 'common/components/LoadingRelative';
import ProfileNavigation from 'screens/App/Profile/components/Profile.Navigation';
// types
import { ProfileHeaderData } from 'types/Profile/profile';

type IProps = {
  userId: string;
}

const ProfileScreen: FC<IProps> = ({ userId }: IProps) => {
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
