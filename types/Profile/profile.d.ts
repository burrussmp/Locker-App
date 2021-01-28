import { UserInfoTypeType } from 'api/user';

declare type ProfileHeaderData = {
  userInfo: UserInfoTypeType;
  isMyProfile: boolean;
} | null;
