'use strict';

import {UserInfoType} from 'api/user';

export type ProfileHeaderData = {
  userInfo: UserInfoType;
  avatarURI: string;
  isMyProfile: boolean;
} | null;
