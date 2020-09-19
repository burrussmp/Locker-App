'use strict';

import auth from './auth';
import session from './session';
import user from './user';
import avatar from './avatar';
import s3 from './S3';

type API = {
  session: typeof session;
  auth: typeof auth;
  user: typeof user;
  avatar: typeof avatar;
  s3: typeof s3;
};

const api: API = {
  session: session,
  auth: auth,
  user: user,
  avatar: avatar,
  s3: s3,
};

export default api;
