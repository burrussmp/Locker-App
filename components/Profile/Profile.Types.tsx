'use strict';

import {UserInfoType} from 'api/user';

export type ProfileHeaderData = {
  userInfo: UserInfoType;
  isMyProfile: boolean;
} | null;
