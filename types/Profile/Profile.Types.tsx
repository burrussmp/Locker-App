'use strict';

import {UserInfoTypeType} from 'api/user';

export type ProfileHeaderData = {
  userInfo: UserInfoTypeType;
  isMyProfile: boolean;
} | null;
